import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.string("title").notNullable();
    table.text("description").nullable();
    table.date("start_date").notNullable();
    table.date("due_date").notNullable();
    table
      .enu("priority", ["low", "medium", "high", "urgent"])
      .notNullable()
      .defaultTo("low");
    table
      .enu("status", ["not_started", "in_progress", "completed", "cancelled"])
      .notNullable()
      .defaultTo("not_started");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("tasks");
}
