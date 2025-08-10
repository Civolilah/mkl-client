/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import {
  Text,
  Box,
  Modal,
  Button,
  MarkdownEditor,
  TextField,
} from '@components/index';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const FeedbackModal = ({ visible, onClose }: Props) => {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState('general');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setRating(0);
    setHoverRating(0);
    setFeedbackType('general');
    setTitle('');
    setMessage('');
    onClose();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // API call to submit feedback
      const payload = {
        type: feedbackType,
        rating,
        title,
        message,
        timestamp: new Date().toISOString(),
      };

      // await submitFeedback(payload);
      console.log('Feedback submitted:', payload);

      // Reset form and close modal
      handleClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return (
      <div className="flex justify-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="text-3xl transition-all duration-150 hover:scale-110 transform"
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(star)}
          >
            <span
              className={
                star <= (hoverRating || rating)
                  ? 'text-yellow-300'
                  : 'text-gray-300'
              }
            >
              ★
            </span>
          </button>
        ))}
      </div>
    );
  };

  const getFeedbackTypeLabel = (type: string) => {
    switch (type) {
      case 'feature':
        return t('feature_request');
      case 'bug':
        return t('report_bug');
      default:
        return t('general_feedback');
    }
  };

  const getTitlePlaceholder = () => {
    switch (feedbackType) {
      case 'feature':
        return t('feature_request_title_placeholder');
      case 'bug':
        return t('bug_report_title_placeholder');
      default:
        return t('general_feedback_title_placeholder');
    }
  };

  const getMessagePlaceholder = () => {
    switch (feedbackType) {
      case 'feature':
        return t('feature_request_placeholder');
      case 'bug':
        return t('bug_report_placeholder');
      default:
        return t('general_feedback_placeholder');
    }
  };

  return (
    <Modal
      title={t('send_feedback')}
      visible={visible}
      onClose={handleClose}
      disableClosing={isSubmitting}
      size="large"
    >
      <Box className="flex flex-col space-y-5 w-full">
        <div className="flex justify-center">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { value: 'general', icon: '💬', label: t('general_feedback') },
              { value: 'feature', icon: '💡', label: t('feature_request') },
              { value: 'bug', icon: '🐛', label: t('report_bug') },
            ].map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setFeedbackType(type.value)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg border transition-colors ${
                  feedbackType === type.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">{type.icon}</span>
                <span className="text-sm font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <Box className="text-center">
          <Text className="font-medium mb-4">{t('rating_experience')}</Text>
          <div className="flex flex-col items-center space-y-3">
            {renderStars()}
            {rating > 0 && (
              <Text className="text-sm text-gray-600 font-medium">
                {rating === 1 && t('very_poor')}
                {rating === 2 && t('poor')}
                {rating === 3 && t('average')}
                {rating === 4 && t('good')}
                {rating === 5 && t('excellent')}
              </Text>
            )}
          </div>
        </Box>

        <TextField
          type="text"
          label={t('title')}
          value={title}
          onValueChange={(value) => setTitle(value)}
          placeHolder={getTitlePlaceholder() as string}
        />

        <MarkdownEditor
          label={getFeedbackTypeLabel(feedbackType)}
          value={message}
          onChange={(value) => setMessage(value)}
          placeholder={getMessagePlaceholder()}
          height="180px"
        />

        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={
            isSubmitting || !message.trim() || !title.trim() || rating === 0
          }
          disabledWithLoadingIcon={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? t('sending') : t('send_feedback')}
        </Button>

        <Text className="text-xs text-gray-500">
          {t('feedback_privacy_note')}
        </Text>
      </Box>
    </Modal>
  );
};

export default FeedbackModal;
