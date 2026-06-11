// Generated from: features/F-04/F-04-02-002_navigation.feature
import { test } from "playwright-bdd";

test.describe('サプライヤー詳細画面 - ナビゲーション', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test('「一覧に戻る」ボタンでサプライヤー一覧に遷移する', { tag: ['@F-04-02-002', '@F-04-02-003', '@正常系'] }, async ({ Given, When, Then, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await When('SD_「← 一覧に戻る」ボタンをクリックする', null, { page }); 
    await Then('SD_サプライヤー一覧画面に遷移している', null, { page }); 
  });

  test('「編集」ボタンでサプライヤー編集画面に遷移する', { tag: ['@F-04-02-002', '@F-04-02-003', '@正常系'] }, async ({ Given, When, Then, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await When('SD_「編集」ボタンをクリックする', null, { page }); 
    await Then('SD_サプライヤー編集画面に遷移している', null, { page }); 
  });

  test.describe('全ロールでナビゲーションボタンが利用可能', () => {

    test('Example #1', { tag: ['@F-04-02-002', '@F-04-02-003', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
      await And('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
      await Then('SD_「← 一覧に戻る」ボタンが表示されている', null, { page }); 
      await And('SD_「編集」ボタンが表示されている', null, { page }); 
    });

    test('Example #2', { tag: ['@F-04-02-002', '@F-04-02-003', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "MANAGER" でログインしている', null, { page }); 
      await And('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
      await Then('SD_「← 一覧に戻る」ボタンが表示されている', null, { page }); 
      await And('SD_「編集」ボタンが表示されている', null, { page }); 
    });

    test('Example #3', { tag: ['@F-04-02-002', '@F-04-02-003', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "BUYER" でログインしている', null, { page }); 
      await And('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
      await Then('SD_「← 一覧に戻る」ボタンが表示されている', null, { page }); 
      await And('SD_「編集」ボタンが表示されている', null, { page }); 
    });

    test('Example #4', { tag: ['@F-04-02-002', '@F-04-02-003', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "WAREHOUSE_STAFF" でログインしている', null, { page }); 
      await And('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
      await Then('SD_「← 一覧に戻る」ボタンが表示されている', null, { page }); 
      await And('SD_「編集」ボタンが表示されている', null, { page }); 
    });

    test('Example #5', { tag: ['@F-04-02-002', '@F-04-02-003', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "VIEWER" でログインしている', null, { page }); 
      await And('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
      await Then('SD_「← 一覧に戻る」ボタンが表示されている', null, { page }); 
      await And('SD_「編集」ボタンが表示されている', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-04/F-04-02-002_navigation.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":10,"tags":["@F-04-02-002","@F-04-02-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When SD_「← 一覧に戻る」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then SD_サプライヤー一覧画面に遷移している","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":16,"tags":["@F-04-02-002","@F-04-02-003","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":19,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When SD_「編集」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then SD_サプライヤー編集画面に遷移している","stepMatchArguments":[]}]},
  {"pwTestLine":25,"pickleLine":30,"tags":["@F-04-02-002","@F-04-02-003","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":27,"gherkinStepLine":24,"keywordType":"Context","textWithKeyword":"And SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":28,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then SD_「← 一覧に戻る」ボタンが表示されている","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And SD_「編集」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":32,"pickleLine":31,"tags":["@F-04-02-002","@F-04-02-003","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"MANAGER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"MANAGER\"","children":[{"start":10,"value":"MANAGER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":34,"gherkinStepLine":24,"keywordType":"Context","textWithKeyword":"And SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":35,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then SD_「← 一覧に戻る」ボタンが表示されている","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And SD_「編集」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":39,"pickleLine":32,"tags":["@F-04-02-002","@F-04-02-003","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"BUYER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"BUYER\"","children":[{"start":10,"value":"BUYER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":41,"gherkinStepLine":24,"keywordType":"Context","textWithKeyword":"And SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":42,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then SD_「← 一覧に戻る」ボタンが表示されている","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And SD_「編集」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":46,"pickleLine":33,"tags":["@F-04-02-002","@F-04-02-003","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"WAREHOUSE_STAFF\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"WAREHOUSE_STAFF\"","children":[{"start":10,"value":"WAREHOUSE_STAFF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":48,"gherkinStepLine":24,"keywordType":"Context","textWithKeyword":"And SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":49,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then SD_「← 一覧に戻る」ボタンが表示されている","stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And SD_「編集」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":53,"pickleLine":34,"tags":["@F-04-02-002","@F-04-02-003","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"VIEWER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"VIEWER\"","children":[{"start":10,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":55,"gherkinStepLine":24,"keywordType":"Context","textWithKeyword":"And SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":56,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then SD_「← 一覧に戻る」ボタンが表示されている","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And SD_「編集」ボタンが表示されている","stepMatchArguments":[]}]},
]; // bdd-data-end