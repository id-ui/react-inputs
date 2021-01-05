import React, { Fragment } from 'react';
import { configureIcons } from '@idui/react-icon';

configureIcons({
  cross: {
    viewBox: '0 0 12 12',
    content: (
      <Fragment>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.3342 11.3137C10.9437 11.7042 10.3105 11.7042 9.92 11.3137L0.727615 2.12132C0.33709 1.7308 0.33709 1.09763 0.727615 0.707108C1.11814 0.316584 1.7513 0.316584 2.14183 0.707108L11.3342 9.8995C11.7247 10.29 11.7247 10.9232 11.3342 11.3137Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.7068 11.3137C1.09732 11.7042 1.73049 11.7042 2.12101 11.3137L11.3134 2.12132C11.7039 1.7308 11.7039 1.09763 11.3134 0.707108C10.9229 0.316584 10.2897 0.316584 9.89919 0.707108L0.7068 9.8995C0.316276 10.29 0.316275 10.9232 0.7068 11.3137Z"
          fill="currentColor"
        />
      </Fragment>
    ),
  },
  search: {
    viewBox: '0 0 20 19',
    content: (
      <Fragment>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.5 13C10.5376 13 13 10.5376 13 7.5C13 4.46243 10.5376 2 7.5 2C4.46243 2 2 4.46243 2 7.5C2 10.5376 4.46243 13 7.5 13ZM7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15Z"
          fill="currentColor"
        />
        <path
          d="M11.8438 13.1213C11.4533 12.7308 11.4533 12.0976 11.8438 11.7071C12.2343 11.3166 12.8675 11.3166 13.258 11.7071L18.295 16.744C18.6855 17.1346 18.6855 17.7677 18.295 18.1583C17.9045 18.5488 17.2713 18.5488 16.8808 18.1583L11.8438 13.1213Z"
          fill="currentColor"
        />
      </Fragment>
    ),
  },
  add: {
    viewBox: '0 0 12 12',
    content: (
      <Fragment>
        <rect x="5" width="2" height="12" rx="1" fill="currentColor" />
        <rect
          y="7"
          width="2"
          height="12"
          rx="1"
          transform="rotate(-90 0 7)"
          fill="currentColor"
        />
      </Fragment>
    ),
  },
});
