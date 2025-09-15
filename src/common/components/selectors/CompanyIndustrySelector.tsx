/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useMemo } from 'react';

import { SelectStaticField } from '@components/index';

import { useTranslation } from '@hooks/index';

interface Props {
  label?: string;
  placeHolder?: string;
  value: string | undefined;
  onClear?: () => void;
  onValueChange: (value: string) => void;
  errorMessage?: string;
  required?: boolean;
  withoutOptionalText?: boolean;
  disabled?: boolean;
}

const CompanyIndustrySelector = ({
  label,
  placeHolder,
  value,
  onClear,
  onValueChange,
  errorMessage,
  required,
  withoutOptionalText,
  disabled,
}: Props) => {
  const t = useTranslation();

  const companyIndustryOptions = useMemo(() => {
    return [
      { value: 'fashion_apparel', label: t('fashion_apparel') },
      { value: 'electronics_tech', label: t('electronics_tech') },
      { value: 'food_beverage', label: t('food_beverage') },
      { value: 'health_beauty_cosmetics', label: t('health_beauty_cosmetics') },
      { value: 'home_furniture_decor', label: t('home_furniture_decor') },
      { value: 'automotive_parts', label: t('automotive_parts') },
      {
        value: 'books_media_entertainment',
        label: t('books_media_entertainment'),
      },
      { value: 'sports_fitness_outdoors', label: t('sports_fitness_outdoors') },
      { value: 'toys_games_hobbies', label: t('toys_games_hobbies') },
      { value: 'jewelry_accessories', label: t('jewelry_accessories') },
      { value: 'pet_supplies', label: t('pet_supplies') },
      { value: 'baby_kids_maternity', label: t('baby_kids_maternity') },
      {
        value: 'office_supplies_stationery',
        label: t('office_supplies_stationery'),
      },
      {
        value: 'tools_hardware_industrial',
        label: t('tools_hardware_industrial'),
      },
      { value: 'arts_crafts_supplies', label: t('arts_crafts_supplies') },
      { value: 'musical_instruments', label: t('musical_instruments') },
      { value: 'garden_outdoor_living', label: t('garden_outdoor_living') },
      {
        value: 'medical_healthcare_supplies',
        label: t('medical_healthcare_supplies'),
      },
      { value: 'wholesale_distribution', label: t('wholesale_distribution') },
      {
        value: 'manufacturing_production',
        label: t('manufacturing_production'),
      },
      {
        value: 'construction_building_materials',
        label: t('construction_building_materials'),
      },
      { value: 'agriculture_farming', label: t('agriculture_farming') },
      { value: 'pharmacy_supplements', label: t('pharmacy_supplements') },
      { value: 'luxury_goods', label: t('luxury_goods') },
      { value: 'vintage_collectibles', label: t('vintage_collectibles') },
      { value: 'other', label: t('other') },
    ];
  }, []);

  return (
    <SelectStaticField
      label={label}
      placeholder={placeHolder}
      required={required}
      mode="single"
      options={companyIndustryOptions}
      value={value ? [value] : []}
      onChange={(value) => onValueChange(value as string)}
      errorMessage={errorMessage}
      onClear={onClear}
      withoutOptionalText={withoutOptionalText}
      disabled={disabled}
    />
  );
};

export default CompanyIndustrySelector;
