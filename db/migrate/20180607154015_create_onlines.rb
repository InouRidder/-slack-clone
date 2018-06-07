class CreateOnlines < ActiveRecord::Migration[5.1]
  def change
    create_table :onlines do |t|
      t.jsonb :users, default: []
      t.timestamps
    end
  end
end
