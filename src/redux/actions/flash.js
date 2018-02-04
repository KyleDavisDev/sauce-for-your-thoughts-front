export const flashSuccess = ({ text, slug = null }) => ({
  type: "SUCCESS_FLASH",
  text,
  slug
});

export const flashError = ({ text, slug = null }) => ({
  type: "ERROR_FLASH",
  text,
  slug
});

export const flashWarning = ({ text, slug = null }) => ({
  type: "WARNING_FLASH",
  text,
  slug
});

export const flashToggle = () => ({
  type: "TOGGLE_FLASH"
});

export const flashClose = () => ({
  type: "CLOSE_FLASH"
});
