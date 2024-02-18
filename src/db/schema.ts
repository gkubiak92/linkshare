import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    image: text("image").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    password: text("password").notNull().default(""),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(users.email),
    };
  },
);

export const linkEntries = pgTable("linkEntries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  thumbnailUrl: text("thumbnailUrl").notNull(),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const linkEntriesRelations = relations(linkEntries, ({ one, many }) => ({
  user: one(users, { fields: [linkEntries.userId], references: [users.id] }),
  tags: many(tagsToLinkEntries),
  votes: many(votesToLinkEntries),
}));

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  linkEntries: many(tagsToLinkEntries),
}));

export const tagsToLinkEntries = pgTable("tagsToLinkEntries", {
  id: serial("id").primaryKey(),
  linkEntryId: integer("linkEntryId")
    .notNull()
    .references(() => linkEntries.id),
  tagId: integer("tagId")
    .notNull()
    .references(() => tags.id),
});

export const tagsToLinkEntriesRelations = relations(
  tagsToLinkEntries,
  ({ one }) => ({
    tag: one(tags, {
      fields: [tagsToLinkEntries.tagId],
      references: [tags.id],
    }),
    linkEntry: one(linkEntries, {
      fields: [tagsToLinkEntries.linkEntryId],
      references: [linkEntries.id],
    }),
  }),
);

export const votesToLinkEntries = pgTable("votesToLinkEntries", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  linkEntryId: integer("linkEntryId")
    .notNull()
    .references(() => linkEntries.id),
  vote: integer("vote"),
});

export const votesToLinkEntriesRelations = relations(
  votesToLinkEntries,
  ({ one }) => ({
    linkEntry: one(linkEntries, {
      fields: [votesToLinkEntries.linkEntryId],
      references: [linkEntries.id],
    }),
  }),
);
