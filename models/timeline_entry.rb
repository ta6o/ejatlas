class TimelineEntry < ActiveRecord::Base
  belongs_to :conflict_text
  belongs_to :account

  def get_entry_date
    return nil unless self.entry_date
    if self.entry_date.length == 4
      return '00/00/'+date
    elsif self.entry_date.length == 7
      return '00/'+self.entry_date
    else
      return self.entry_date
    end
  end

  def get_entry_datestamp
    return nil unless self.entry_date
    Date.strptime(self.get_entry_date.sub(/^00\//,"01/").sub(/\/00\//,"/01/"),"%d/%m/%Y")
  end

  def set_entry_datestamp
    return unless self.entry_date
    self.update :entry_datestamp => self.get_entry_datestamp
  end

  def inspect
    "##{self.conflict_text.conflict_id.to_s.rjust(5,"0").cyan}-#{self.conflict_text.locale.to_s.green}-#{self.conflict_text_id.to_s.rjust(5,"0").green}: #{self.title} (#{(self.entry_date||"").magenta})"
  end

end
