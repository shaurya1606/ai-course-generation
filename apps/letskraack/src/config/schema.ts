import { boolean, integer, pgTable, varchar, json } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  subscriptionId: varchar({ length: 255 }).notNull(),
});

export const coursesTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar({ length: 255 }).notNull().unique(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 1024 }).notNull(),
  duration: varchar({ length: 100 }).notNull(),
  noOfChapters: integer().notNull(),
  includeVideo: boolean().notNull().default(false),
  difficultyLevel: varchar({ length: 100 }).notNull(),
  category: varchar({ length: 255 }),
  courseJson: json(),
  bannerImageUrl: varchar({ length: 1024 }).default(''),
  courseContent: json().default({}),
  userEmail: varchar("userEmail").references(() => usersTable.email).notNull(),
});

export const enrollCoursesTable = pgTable("enrollCourse", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar('cid').references(() => coursesTable.cid).notNull().unique(),
  userEmail: varchar("userEmail").references(() => usersTable.email).notNull(),
  completedChapters: json().default([]),
});

export const discussionRoomTable = pgTable("discussionRoom", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  roomId: varchar({ length: 255 }).notNull().unique(),
  coachingOption: varchar({ length: 255 }).notNull(),
  topic: varchar({ length: 255 }).notNull(),
  expertName: varchar({ length: 255 }).notNull(),
  conversation: json()
});
