import {
  GenericDataModel,
  GenericDatabaseReader,
  GenericDatabaseWriter,
  GenericMutationCtx,
  GenericQueryCtx,
} from "convex/server";
import { GenericId } from "convex/values";

export type Id<TableName extends TableNames> = GenericId<TableName>;

export type TableNames = "messages" | "projectLikes" | "guestbook";

export interface Doc<TableName extends TableNames> {
  _id: Id<TableName>;
  _creationTime: number;
  [key: string]: any;
}

export interface MessagesDoc extends Doc<"messages"> {
  name?: string;
  email: string;
  message: string;
  source: string;
  createdAt: number;
}

export interface ProjectLikesDoc extends Doc<"projectLikes"> {
  projectId: string;
  likes: number;
}

export interface GuestbookDoc extends Doc<"guestbook"> {
  name: string;
  message: string;
  avatar?: string;
  createdAt: number;
}

export type DataModel = {
  messages: {
    document: MessagesDoc;
    fieldPaths: "_id" | "_creationTime" | "name" | "email" | "message" | "source" | "createdAt";
    indexes: {
      by_created_at: ["createdAt"];
    };
  };
  projectLikes: {
    document: ProjectLikesDoc;
    fieldPaths: "_id" | "_creationTime" | "projectId" | "likes";
    indexes: {
      by_project_id: ["projectId"];
    };
  };
  guestbook: {
    document: GuestbookDoc;
    fieldPaths: "_id" | "_creationTime" | "name" | "message" | "avatar" | "createdAt";
    indexes: {
      by_created_at: ["createdAt"];
    };
  };
};

export type DatabaseReader = GenericDatabaseReader<DataModel>;
export type DatabaseWriter = GenericDatabaseWriter<DataModel>;
export type QueryCtx = GenericQueryCtx<DataModel>;
export type MutationCtx = GenericMutationCtx<DataModel>;
