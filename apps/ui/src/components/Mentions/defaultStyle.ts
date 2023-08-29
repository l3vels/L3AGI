export default {
  '&multiLine': {
    // height: 20,

    input: {
      maxHeight: 100,
      border: 'none',
      color: '#fff',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '22px',
      overflowY: 'scroll',
      width: '100%',
    },
  },
  highlighter: {
    boxSizing: 'border-box',
    overflow: 'hidden',
    maxHeight: 100,
    maxWidth: 'fit-content',

    fontSize: '14px',
    lineHeight: '22px',
    fontWeight: '500',
    fontStyle: 'normal',
  },
  suggestions: {
    list: {
      fontSize: 14,
      maxHeight: 250,
      width: '100%',
      overflowY: 'scroll',
      padding: 10,
      color: '#FFF',
    },
    item: {
      padding: '5px 15px',

      border: '1px solid transparent',
      '&focused': {
        background: 'rgba(255, 255, 255, 0.1)',

        border: '1px solid rgba(255, 255, 255, 0.4)',
        borderRadius: 6,
      },
    },
  },
}
