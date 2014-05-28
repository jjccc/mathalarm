class Receiver < ActiveRecord::Base
  paginates_per 10
  
  belongs_to :alarm
  
  def is_email?
    !self.name.nil? && self.name.partition("@").none?{ |x| x.blank? }
  end
  
  def is_twitter?
    !self.name.nil? && self.name.starts_with?("@") && !self.name.partition("@")[2].blank?
  end
  
end
