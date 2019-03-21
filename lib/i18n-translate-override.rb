module I18n
  module Base
    def translate(*args)
      options  = args.last.is_a?(Hash) ? args.pop.dup : {}
      key      = args.shift
      backend  = config.backend
      locale   = options.delete(:locale) || config.locale
      handling = options.delete(:throw) && :throw || options.delete(:raise) && :raise # TODO deprecate :raise

      enforce_available_locales!(locale)

      result = catch(:exception) do
        if key.is_a?(Array)
          key.map { |k| backend.translate(locale, k, options) }
        else
          backend.translate(locale, key, options)
        end
      end
      if result.is_a?(MissingTranslation)
        handle_exception(handling, result, locale, key, options) 
      elsif result.is_a? String
        result.sub(/^-$/,"")
      else
        result
      end
    end
    alias :t :translate
  end
end

class String
  def slug fill="-"
    return self if self.nil?
    self.to_ascii
      .downcase
      .strip
      .gsub(/[-_\s\/]+/, '-')
      .gsub(/[^\w-]/, '')
      .gsub(/-+/,fill)
  end
  def unslug lettercase="down"
    return self if self.nil?
    lettercase = lettercase.to_s.downcase
    if lettercase == "title"
      self.gsub(/[-_\s\/]+/, ' ').titlecase
    elsif lettercase == "up"
      self.gsub(/[-_\s\/]+/, ' ').upcase
    else
      self.gsub(/[-_\s\/]+/, ' ')
    end
  end
  def shorten_en
    words = self.gsub(/%{[^}]+}/,"var").strip.slug.split(/-/)
    ["a","and","of","the"].each{|d| words.delete(d)} if words.length > 3
    words[0..4].join("_")
  end
end

