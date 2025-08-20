class StoreData {

    constructor() {
        this.store = {
            InputForm: {},
            Pattern: {}
        };
    }

    getLanguage() {
      return this.store.Pattern.selectedLanguage;
    }
    
    getModel() {
      return this.store.Pattern.selectedModel;
    }
    
    getSentence() {
      return this.store.InputForm.sentence;
    }
    
    getPattern() {
      return this.store.InputForm.usersPattern;
    }

    setPattern(pattern) {
        this.store.InputForm.usersPattern = pattern;
    }

    getAPIKey() {
        return this.store.InputForm.usersKey;
    }

    //加载参数
    loadParameter(usersInputForm, selectedPattern) {
      this.store.InputForm = usersInputForm;
      this.store.Pattern = selectedPattern;

      console.log(this.store.InputForm.usersPattern);
    
      console.log("store", this.store.InputForm);
      console.log("store:", this.store.Pattern);

      console.log(this.getLanguage());
    }
}

//导出单例
export const storeData = new StoreData();