import React from 'react';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  yesButton: { marginLeft: '1rem' },
};

export function ConfirmationDialog({ dialog, text }) {
  const handleNoClick = () => dialog.close('NO');
  const handleYesClick = () => dialog.close('YES');

  return (
    <div style={styles.wrapper}>
      <sp-body size="XL">{text}</sp-body>
      <footer>
        <sp-button variant="primary" onClick={handleNoClick}>
          No
        </sp-button>
        <sp-button style={styles.yesButton} onClick={handleYesClick}>
          Yes
        </sp-button>
      </footer>
    </div>
  );
}
