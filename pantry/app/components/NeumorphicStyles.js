// components/NeumorphicStyles.js
export const getNeumorphicStyles = (theme) => ({
    boxShadow: `
      ${theme.palette.mode === "dark" ? '5px 5px 10px rgba(0, 0, 0, 0.5), -5px -5px 10px rgba(255, 255, 255, 0.1)' : '7px 7px 15px rgba(0, 0, 0, 0.1), -7px -7px 15px rgba(255, 255, 255, 0.7)'}
    `,
    borderRadius: "10px",
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
  });
  
  export const getNeumorphicButtonStyles = (theme) => ({
    ...getNeumorphicStyles(theme),
    padding: "10px 20px",
    display: "inline-block",
    border: "none",
    cursor: "pointer",
    outline: "none",
    transition: "box-shadow 0.3s ease",
    "&:hover": {
      boxShadow: `
        ${theme.palette.mode === "dark" ? '3px 3px 6px rgba(0, 0, 0, 0.6), -3px -3px 6px rgba(255, 255, 255, 0.1)' : '3px 3px 6px rgba(0, 0, 0, 0.2), -3px -3px 6px rgba(255, 255, 255, 0.8)'}
      `,
    },
    "&:active": {
      boxShadow: `
        inset 3px 3px 6px rgba(0, 0, 0, 0.2),
        inset -3px -3px 6px rgba(255, 255, 255, 0.8)
      `,
    },
  });
  
  export const getNeumorphicContainerStyles = (theme) => ({
    ...getNeumorphicStyles(theme),
    padding: "20px",
    margin: "20px",
  });
  
  export const getNeumorphicHeaderStyles = (theme) => ({
    ...getNeumorphicStyles(theme),
    padding: "10px 20px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  });
  