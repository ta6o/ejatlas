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
      else
        result.sub(/^-$/,"")
      end
    end
    alias :t :translate
  end
end
