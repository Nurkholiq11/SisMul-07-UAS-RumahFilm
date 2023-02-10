/**
 * Typography used in theme
 * @param {JsonObject} theme theme customization object
 */

export default function themeTypography(theme) {
  return {
    fontFamily: 'Poppins',
    htmlFontSize: 10,
    h6: {
      fontWeight: 500,
      color: theme.heading,
      fontSize: '1.2rem',
    },
    h5: {
      fontSize: '1.4rem',
      color: theme.heading,
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.6rem',
      color: theme.heading,
      fontWeight: 600,
    },
    h3: {
      fontSize: '2rem',
      color: theme.heading,
      fontWeight: 600,
    },
    h2: {
      fontSize: '2.4rem',
      color: theme.heading,
      fontWeight: 700,
    },
    h1: {
      fontSize: '5rem',
      color: theme.heading,
      fontWeight: 700,
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: theme.mainTextPrimary,
    },
    menu: {
      fontWeight: 500,
      fontSize: '1.2rem',
      color: theme.paper,
    },
    subtitle1: {
      fontSize: '1.4rem',
      fontWeight: 500,
      color: theme.textDark,
    },
    subtitle2: {
      fontSize: '1.2rem',
      fontWeight: 400,
      color: theme.darkTextSecondary,
    },
    caption: {
      fontSize: '1.2rem',
      // color: theme.paper,
      fontWeight: 400,
    },
    caption1: {
      fontSize: '1.2rem',
      color: theme.darkTextSecondary,
      fontWeight: 400,
    },
    caption2: {
      fontSize: '1.1rem',
      color: theme.darkTextSecondary,
      fontWeight: 400,
    },
    caption3: {
      fontSize: '0.85rem',
      color: theme.darkTextSecondary,
      fontWeight: 400,
    },
    body1: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: '1.334em',
    },
    label: {
      fontSize: '1.4rem',
      fontWeight: 600,
      color: theme.mainTextPrimary,
      marginBottom: 5,
      display: 'block',
    },
    body2: {
      letterSpacing: '0em',
      fontWeight: 400,
      lineHeight: '1.5em',
      color: theme.darkTextPrimary,
    },
    body3: {
      fontSize: '1.15rem',
      letterSpacing: '0em',
      fontWeight: 600,
      lineHeight: '1.5em',
    },
    customInput: {
      marginTop: 1,
      marginBottom: 1,
      '& > label': {
        top: 23,
        left: 0,
        color: theme.grey500,
        '&[data-shrink="false"]': {
          top: 5,
        },
      },
      '& > div > input': {
        padding: '30.5px 14px 11.5px !important',
      },
      '& legend': {
        display: 'none',
      },
      '& fieldset': {
        top: 0,
      },
    },
    mainContent: {
      backgroundColor: 'theme.background',
      width: '100%',
      flexGrow: 1,
      borderRadius: `${theme?.customization?.borderRadius}px`,
      position: 'relative',
    },
    menuCaption: {
      fontSize: '1.4rem',
      fontWeight: 500,
      color: theme.heading,
      padding: '6px',
      textTransform: 'capitalize',
      marginTop: '10px',
    },
    subMenuCaption: {
      fontSize: '1.1rem',
      fontWeight: 500,
      color: theme.darkTextSecondary,
      textTransform: 'capitalize',
    },
    commonAvatar: {
      cursor: 'pointer',
      borderRadius: '8px',
    },
    smallAvatar: {
      width: '22px',
      height: '22px',
      fontSize: '1.6rem',
    },
    mediumAvatar: {
      width: '38px',
      height: '38px',
      fontSize: '19.2rem',
    },
    largeAvatar: {
      width: '44px',
      height: '44px',
      fontSize: '2.4rem',
    },
    extraLargeAvatar: {
      width: '10rem',
      height: '10rem',
      fontSize: '5rem',
    },
    baseButtonLight: {
      backgroundColor: theme.background,
    },
  };
}
