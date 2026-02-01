CREATE TABLE "courses" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "courses_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"cid" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(1024) NOT NULL,
	"duration" varchar(100) NOT NULL,
	"noOfChapters" integer NOT NULL,
	"includeVideo" boolean DEFAULT false NOT NULL,
	"difficultyLevel" varchar(100) NOT NULL,
	"category" varchar(255),
	"courseJson" json,
	"bannerImageUrl" varchar(1024) DEFAULT '',
	"courseContent" json DEFAULT '{}'::json,
	"userEmail" varchar NOT NULL,
	CONSTRAINT "courses_cid_unique" UNIQUE("cid")
);
--> statement-breakpoint
CREATE TABLE "discussionRoom" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "discussionRoom_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"roomId" varchar(255) NOT NULL,
	"coachingOption" varchar(255) NOT NULL,
	"topic" varchar(255) NOT NULL,
	"expertName" varchar(255) NOT NULL,
	"conversation" json,
	"feedback" text,
	"userEmail" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"feedback_generated_at" timestamp with time zone,
	CONSTRAINT "discussionRoom_roomId_unique" UNIQUE("roomId")
);
--> statement-breakpoint
CREATE TABLE "enrollCourse" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "enrollCourse_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"cid" varchar NOT NULL,
	"userEmail" varchar NOT NULL,
	"completedChapters" json DEFAULT '[]'::json,
	CONSTRAINT "enrollCourse_cid_unique" UNIQUE("cid")
);
--> statement-breakpoint
CREATE TABLE "resumeAnalyses" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "resumeAnalyses_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"resumeId" varchar(255) NOT NULL,
	"userEmail" varchar NOT NULL,
	"companyName" varchar(255) NOT NULL,
	"jobTitle" varchar(255) NOT NULL,
	"jobDescription" text NOT NULL,
	"feedback" json,
	"uploaded_at" timestamp with time zone DEFAULT now() NOT NULL,
	"feedback_generated_at" timestamp with time zone,
	CONSTRAINT "resumeAnalyses_resumeId_unique" UNIQUE("resumeId")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"credits" integer DEFAULT 0,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"subscriptionId" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_userEmail_users_email_fk" FOREIGN KEY ("userEmail") REFERENCES "public"."users"("email") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discussionRoom" ADD CONSTRAINT "discussionRoom_userEmail_users_email_fk" FOREIGN KEY ("userEmail") REFERENCES "public"."users"("email") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollCourse" ADD CONSTRAINT "enrollCourse_cid_courses_cid_fk" FOREIGN KEY ("cid") REFERENCES "public"."courses"("cid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollCourse" ADD CONSTRAINT "enrollCourse_userEmail_users_email_fk" FOREIGN KEY ("userEmail") REFERENCES "public"."users"("email") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resumeAnalyses" ADD CONSTRAINT "resumeAnalyses_userEmail_users_email_fk" FOREIGN KEY ("userEmail") REFERENCES "public"."users"("email") ON DELETE no action ON UPDATE no action;