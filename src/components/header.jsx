import { Link, useSearchParams } from "react-router-dom"
import { Button } from "./ui/button"
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from '@clerk/clerk-react';
import { BriefcaseBusinessIcon, Heart, PenBox } from "lucide-react";
import { useEffect, useState } from "react";
const Header = () => {
  const [showSignIn, SetShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const {user} = useUser()
  useEffect(() => {
    if (search.get('sign-in')) {
      SetShowSignIn(true);
    }
  }, [search])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      SetShowSignIn(false);
      setSearch({});
    }
  }
  return (
    <>
      <nav className="py-4 flex justify-between items-center ">
        <Link>
          <img src="/logo.png" alt="Logo" className="h-20" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button variant="outline" onClick={() => SetShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === 'recruiter' && (
              <Link to={'/post-job'}>
            <Button
              variant={"destructive"}
              className={"rounded-full cursor-pointer"}
            >
              {" "}
              <PenBox size={20} className="mr-2" />
              Post a Job
            </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusinessIcon size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-job"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboading"
            fallbackRedirectUrl="/onboading"
            appearance={{
              variables: {
                // 1. POSITIVE (Blue): Used for primary buttons and active states
                colorPrimary: "#2563EB", // Tailwind blue-600

                // 2. NEGATIVE (Light Red): Used for error messages
                colorDanger: "#ef4444", // Tailwind red-500 (readable but distinct)

                // 3. BASE THEME (Black/White):
                colorText: "white",
                borderRadius: "0.5rem",
                colorBackground: "black",
                colorInputBackground: "black",
                colorInputText: "white",
              },
              elements: {
                // The Main Box: Clean white with a subtle border (classic B/W look)
                card: "bg-white border border-gray-200 shadow-xl",

                // The Primary Button (Positive/Blue)
                // Matching your 'variant="blue"' button style
                // HIGH CONTRAST!
                formButtonPrimary:
                  "bg-blue-600 hover:bg-blue-700 text-white border-none normal-case text-base",
                // The Social Buttons (Google, GitHub, etc.)
                // keeping them neutral (Gray/Black) to let the Blue pop
                socialButtonsBlockButton:
                  "bg-white border-gray-300 text-black hover:bg-gray-50",

                // Input Fields
                // Clean borders that turn Blue when clicked
                formFieldInput:
                  "border-gray-300 focus:border-blue-600 focus:ring-blue-600",

                // Footer Links ("Don't have an account?")
                // Making these Blue so they look interactive
                footerActionLink:
                  "text-blue-600 hover:text-blue-700 font-medium",

                // Error Messages (Negative/Light Red)
                // This handles the 'light red' for negative things you mentioned
                formFieldErrorText: "text-red-500",
                alertText: "text-red-500",
              },
            }}
          />
        </div>
      )}
    </>
  );
}

export default Header