import { useState, useEffect } from "react";
import { Hub } from "aws-amplify";
import { useRouter } from "next/router";
import { getUserSession } from "@utils/__api__/users";
import LoadingSkeleton from "@component/skeleton/homePageSkeleton";

type IProtectedProps = {
  children?: any;
  isSidebar?: boolean;
};

const ProtectedRoute = ({ children, isSidebar }: IProtectedProps) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const router = useRouter();

  useEffect(() => {
    initialize();
  }, [isAuthorized]);

  const initialize = async () => {
    try {
      await getUserDetail();
      Hub.listen("auth", async (authData) => {
        if (authData.payload.event === "signOut") {
          // TODO: Clean up after signOut
        }
      });
    } catch (authError) {
      // console.log("Error initializing");
    }
  };

  const getUserDetail = async () => {
    try {
      const user: any = await getUserSession()

      const isActive = user?.isActive;
      const isBanned = user?.isBanned;
      const isLocked = user?.isLocked;
      // const isVerified = user?.isVerified;
      // const isPhoneVerified = user?.isPhoneVerified;
      // const isEmailedVerified = user?.isEmailVerified;

      // const { pathname } = router;

      if (!isActive) {
        return router?.push("/notactive");
      }

      if (isBanned) {
        return router?.push("/banned");
      }

      if (isLocked) {
        return router?.push("/locked");
      }

      setIsAuthorized(true);

      return user;
    } catch (userDetailError) {
      return router?.push("/login");
    }
  };

  if (!isAuthorized) {
    return <LoadingSkeleton />
  }

  return isSidebar && children;
};

ProtectedRoute.defaultProps = {
  children: null,
  isSidebar: true,
};

export default ProtectedRoute;
