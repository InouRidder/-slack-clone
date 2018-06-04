class AddIsWatchingToSubscriptions < ActiveRecord::Migration[5.1]
  def change
    add_column :subscriptions, :is_watching, :boolean, default: true
  end
end
