import {
  GenericMutationCtx,
  GenericQueryCtx,
  GenericActionCtx,
  MutationBuilder,
  QueryBuilder,
  ActionBuilder,
} from "convex/server";
import { DataModel } from "./dataModel";

export declare const query: QueryBuilder<DataModel, "public">;
export declare const mutation: MutationBuilder<DataModel, "public">;
export declare const action: ActionBuilder<DataModel, "public">;
export declare const internalQuery: QueryBuilder<DataModel, "internal">;
export declare const internalMutation: MutationBuilder<DataModel, "internal">;
export declare const internalAction: ActionBuilder<DataModel, "internal">;

export type QueryCtx = GenericQueryCtx<DataModel>;
export type MutationCtx = GenericMutationCtx<DataModel>;
export type ActionCtx = GenericActionCtx<DataModel>;
