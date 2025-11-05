'use client'
import { UserProfile } from "@clerk/nextjs"

const Profile = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-12">
        <div className="space-y-2 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary/70">
            Your Account
          </p>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            Profile & security
          </h1>
          <p className="text-muted-foreground">
            Manage your personal details, notification preferences, and security settings. Updates sync across the Letskraack workspace instantly.
          </p>
        </div>

        <div className="rounded-xl border border-border/60 bg-background/80 p-4 shadow-lg backdrop-blur-sm">
          <UserProfile
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0 bg-transparent",
                headerTitle: "text-2xl font-semibold text-foreground",
                headerSubtitle: "text-muted-foreground",
                profileSectionPrimaryButton: "bg-primary text-primary-foreground hover:bg-primary/90",
                profileSectionSecondaryButton: "text-muted-foreground hover:text-foreground",
                accordionTriggerButton: "text-left",
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Profile