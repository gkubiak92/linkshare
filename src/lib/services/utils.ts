import { PgSelect } from "drizzle-orm/pg-core";

export function withPagination<QueryBuilder extends PgSelect>(
  qb: QueryBuilder,
  page: number,
  pageSize: number = 20,
) {
  return qb.limit(pageSize).offset((page - 1) * pageSize);
}
