/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/rules-of-hooks */
import { Stack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { settingStyles } from './setting-styles';
import { useLive2dSettings } from '@/hooks/sidebar/setting/use-live2d-settings';
import { SwitchField, NumberField } from './common';

interface live2DProps {
  onSave?: (callback: () => void) => () => void
  onCancel?: (callback: () => void) => () => void
}

function live2D({ onSave, onCancel }: live2DProps): JSX.Element {
  const { t } = useTranslation();
  const {
    modelInfo,
    handleInputChange,
    handleSave,
    handleCancel,
  } = useLive2dSettings();

  useEffect(() => {
    if (!onSave || !onCancel) return;

    const cleanupSave = onSave(handleSave);
    const cleanupCancel = onCancel(handleCancel);

    return (): void => {
      cleanupSave?.();
      cleanupCancel?.();
    };
  }, [onSave, onCancel]);

  return (
    <Stack {...settingStyles.common.container}>
      <SwitchField
        label={t('settings.live2d.pointerInteractive')}
        checked={modelInfo.pointerInteractive ?? false}
        onChange={(checked) => handleInputChange('pointerInteractive', checked)}
      />

      <SwitchField
        label={t('settings.live2d.scrollToResize')}
        checked={modelInfo.scrollToResize ?? true}
        onChange={(checked) => handleInputChange('scrollToResize', checked)}
      />
      
      <SwitchField
        label={t('settings.live2d.enableIdleAudio')}
        checked={modelInfo.enableIdleAudio ?? true}
        onChange={(checked) => handleInputChange('enableIdleAudio', checked)}
      />
      
      <NumberField
        label={t('settings.live2d.idleMotionInterval')}
        value={modelInfo.idleMotionInterval ?? 5.0}
        onChange={(value) => handleInputChange('idleMotionInterval', parseFloat(value) || 5.0)}
        min={0.1}
        max={60}
        step={0.5}
        help={t('settings.live2d.idleMotionIntervalHelp')}
      />
    </Stack>
  );
}

export default live2D;
