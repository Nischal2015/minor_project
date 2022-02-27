import React from "react";

import { CustomNavLink } from "../UI/CustomLink/CustomLink";

const CTAList = () => {
  const ctaStyle = { fontSize: "1.4rem" };
  return (
    <React.Fragment>
      <li>
        <CustomNavLink
          to='/login'
          ariaLabel='Signup for our website'
          variant='outline rounded'
          style={ctaStyle}
        >
          Login
        </CustomNavLink>
      </li>
      <li>
        <CustomNavLink
          to='/signup'
          variant='tertiary rounded'
          ariaLabel='Login into our website'
          style={ctaStyle}
        >
          Signup
        </CustomNavLink>
      </li>
      <li>
        <CustomNavLink
          to='/postjob'
          variant='outline rounded'
          ariaLabel='Post Job into website'
          style={ctaStyle}
        >
          PostJob
        </CustomNavLink>
      </li>
      <li>
        <CustomNavLink
          to='/postbid'
          variant='outline rounded'
          ariaLabel='Post Bid for Project'
          style={ctaStyle}
        >
          PostBid
        </CustomNavLink>
      </li>
    </React.Fragment>
  );
};

export default CTAList;
