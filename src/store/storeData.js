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
    
    getUsersPattern() {
      return this.store.InputForm.usersPattern;
    }

    //这个是最终的需要用的pattern
    getPattern() {
      return this.store.InputForm.pattern;
    }

    //不可以直接修改原pattern
    setPattern(pattern) {
        this.store.InputForm.pattern = pattern;
    }

    getAPIKey() {
        return this.store.InputForm.usersKey;
    }

    //加载参数
    loadParameter(usersInputForm, selectedPattern) {
      this.store.InputForm = usersInputForm;
      this.store.Pattern = selectedPattern;
    }
}

//导出单例
export const storeData = new StoreData();