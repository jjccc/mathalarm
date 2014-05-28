require 'spec_helper'

describe Alarm, :type => :model do
  
  it "has not notifications and last_notification is called" do
    a = Alarm.new
    expect(a.last_notification).to eq(nil)
  end
    
end
