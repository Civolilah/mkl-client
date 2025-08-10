/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useTranslation } from 'react-i18next';

export type QuantityUnit =
  | 'pcs'
  | 'mg'
  | 'g'
  | 'kg'
  | 't'
  | 'lb'
  | 'oz'
  | 'mm'
  | 'cm'
  | 'm'
  | 'km'
  | 'in'
  | 'ft'
  | 'yd'
  | 'mm2'
  | 'cm2'
  | 'm2'
  | 'km2'
  | 'sqft'
  | 'sqin'
  | 'ml'
  | 'cl'
  | 'dl'
  | 'l'
  | 'hl'
  | 'gal'
  | 'qt'
  | 'pt'
  | 'fl_oz'
  | 'm3'
  | 'cm3';

export type QuantityUnitOption = {
  label: string;
  value: QuantityUnit;
};

const useQuantityUnitOptions = () => {
  const { t } = useTranslation();

  const options: QuantityUnitOption[] = [
    { label: t('pcs'), value: 'pcs' },
    { label: t('mg'), value: 'mg' },
    { label: t('g'), value: 'g' },
    { label: t('kg'), value: 'kg' },
    { label: t('t'), value: 't' },
    { label: t('lb'), value: 'lb' },
    { label: t('oz'), value: 'oz' },
    { label: t('mm'), value: 'mm' },
    { label: t('cm'), value: 'cm' },
    { label: t('m'), value: 'm' },
    { label: t('km'), value: 'km' },
    { label: t('in'), value: 'in' },
    { label: t('ft'), value: 'ft' },
    { label: t('yd'), value: 'yd' },
    { label: t('mm2'), value: 'mm2' },
    { label: t('cm2'), value: 'cm2' },
    { label: t('m2'), value: 'm2' },
    { label: t('km2'), value: 'km2' },
    { label: t('sqft'), value: 'sqft' },
    { label: t('sqin'), value: 'sqin' },
    { label: t('ml'), value: 'ml' },
    { label: t('cl'), value: 'cl' },
    { label: t('dl'), value: 'dl' },
    { label: t('l'), value: 'l' },
    { label: t('hl'), value: 'hl' },
    { label: t('gal'), value: 'gal' },
    { label: t('qt'), value: 'qt' },
    { label: t('pt'), value: 'pt' },
    { label: t('fl_oz'), value: 'fl_oz' },
    { label: t('m3'), value: 'm3' },
    { label: t('cm3'), value: 'cm3' },
  ];

  return options;
};

export default useQuantityUnitOptions;
