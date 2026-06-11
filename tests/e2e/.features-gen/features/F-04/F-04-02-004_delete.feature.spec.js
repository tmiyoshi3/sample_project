// Generated from: features/F-04/F-04-02-004_delete.feature
import { test } from "playwright-bdd";

test.describe('サプライヤー詳細画面 - サプライヤー削除', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test('削除ボタンで確認ダイアログが表示される', { tag: ['@F-04-02-004', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await When('SD_「削除」ボタンをクリックする', null, { page }); 
    await Then('SD_確認ダイアログが表示されている', null, { page }); 
    await And('SD_ダイアログタイトル「サプライヤーの削除」が表示されている', null, { page }); 
    await And('SD_ダイアログメッセージに削除警告が表示されている', null, { page }); 
    await And('SD_ダイアログ「キャンセル」ボタンが表示されている', null, { page }); 
    await And('SD_ダイアログ「削除する」ボタンが表示されている', null, { page }); 
  });

  test('テスト専用サプライヤーを削除するとサプライヤー一覧に遷移する', { tag: ['@F-04-02-004', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_テスト専用サプライヤーが作成されている'); 
    await And('SD_テスト専用サプライヤー詳細画面にアクセスしている', null, { page }); 
    await When('SD_「削除」ボタンをクリックする', null, { page }); 
    await And('SD_ダイアログ「削除する」をクリックする', null, { page }); 
    await Then('SD_サプライヤー一覧画面に遷移している', null, { page }); 
  });

  test('削除をキャンセルすると詳細画面に戻る', { tag: ['@F-04-02-004', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
    await When('SD_「削除」ボタンをクリックする', null, { page }); 
    await And('SD_ダイアログ「キャンセル」をクリックする', null, { page }); 
    await Then('SD_確認ダイアログが閉じている', null, { page }); 
    await And('SD_サプライヤー詳細画面が表示されている', null, { page }); 
    await And('SD_会社名「大塚商会」が表示されている', null, { page }); 
  });

  test.describe('全ロールで削除ボタンが利用可能', () => {

    test('Example #1', { tag: ['@F-04-02-004', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
      await And('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
      await Then('SD_「削除」ボタンが表示されている', null, { page }); 
    });

    test('Example #2', { tag: ['@F-04-02-004', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "MANAGER" でログインしている', null, { page }); 
      await And('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
      await Then('SD_「削除」ボタンが表示されている', null, { page }); 
    });

    test('Example #3', { tag: ['@F-04-02-004', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "BUYER" でログインしている', null, { page }); 
      await And('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
      await Then('SD_「削除」ボタンが表示されている', null, { page }); 
    });

    test('Example #4', { tag: ['@F-04-02-004', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "WAREHOUSE_STAFF" でログインしている', null, { page }); 
      await And('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
      await Then('SD_「削除」ボタンが表示されている', null, { page }); 
    });

    test('Example #5', { tag: ['@F-04-02-004', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "VIEWER" でログインしている', null, { page }); 
      await And('SD_サプライヤー詳細画面（ID=1）にアクセスしている', null, { page }); 
      await Then('SD_「削除」ボタンが表示されている', null, { page }); 
    });

  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks }) => $runScenarioHooks('before', {  }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-04/F-04-02-004_delete.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":10,"tags":["@F-04-02-004","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When SD_「削除」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then SD_確認ダイアログが表示されている","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And SD_ダイアログタイトル「サプライヤーの削除」が表示されている","stepMatchArguments":[{"group":{"start":13,"value":"サプライヤーの削除","children":[]}}]},{"pwStepLine":16,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And SD_ダイアログメッセージに削除警告が表示されている","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And SD_ダイアログ「キャンセル」ボタンが表示されている","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And SD_ダイアログ「削除する」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":20,"tags":["@F-04-02-004","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"Given SD_テスト専用サプライヤーが作成されている","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"And SD_テスト専用サプライヤー詳細画面にアクセスしている","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When SD_「削除」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"And SD_ダイアログ「削除する」をクリックする","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then SD_サプライヤー一覧画面に遷移している","stepMatchArguments":[]}]},
  {"pwTestLine":29,"pickleLine":28,"tags":["@F-04-02-004","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":29,"keywordType":"Context","textWithKeyword":"Given SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":31,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When SD_「削除」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"And SD_ダイアログ「キャンセル」をクリックする","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then SD_確認ダイアログが閉じている","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"And SD_サプライヤー詳細画面が表示されている","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"And SD_会社名「大塚商会」が表示されている","stepMatchArguments":[{"group":{"start":7,"value":"大塚商会","children":[]}}]}]},
  {"pwTestLine":40,"pickleLine":44,"tags":["@F-04-02-004","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":38,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":42,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"And SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":43,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then SD_「削除」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":46,"pickleLine":45,"tags":["@F-04-02-004","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":38,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"MANAGER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"MANAGER\"","children":[{"start":10,"value":"MANAGER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":48,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"And SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":49,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then SD_「削除」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":52,"pickleLine":46,"tags":["@F-04-02-004","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":38,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"BUYER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"BUYER\"","children":[{"start":10,"value":"BUYER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":54,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"And SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":55,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then SD_「削除」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":58,"pickleLine":47,"tags":["@F-04-02-004","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":38,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"WAREHOUSE_STAFF\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"WAREHOUSE_STAFF\"","children":[{"start":10,"value":"WAREHOUSE_STAFF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":60,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"And SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":61,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then SD_「削除」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":64,"pickleLine":48,"tags":["@F-04-02-004","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":38,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"VIEWER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"VIEWER\"","children":[{"start":10,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":66,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"And SD_サプライヤー詳細画面（ID=1）にアクセスしている","stepMatchArguments":[{"group":{"start":17,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":67,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then SD_「削除」ボタンが表示されている","stepMatchArguments":[]}]},
]; // bdd-data-end