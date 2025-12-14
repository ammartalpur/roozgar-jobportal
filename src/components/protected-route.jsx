import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { Navigate, useLocation } from 'react-router-dom'
import { BarLoader } from 'react-spinners'
const ProtectedRoute = ({children}) => {
  const {isSignedIn, user , isLoaded } = useUser()
  const { pathname } = useLocation();
  
  if (!isLoaded) {
    return (
      <div>
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      </div>
    );
  }
  if (!isSignedIn && isSignedIn != undefined) {
    return <Navigate to={'/?sign-in=true'} state={{from: pathname}} />
  }

  if (
    user !== undefined &&
    !user?.unsafeMetadata?.role &&
    pathname !== "/onboading"
  ) {
    return <Navigate to={"/onboading"} />;
  }


  return children
}

export default ProtectedRoute