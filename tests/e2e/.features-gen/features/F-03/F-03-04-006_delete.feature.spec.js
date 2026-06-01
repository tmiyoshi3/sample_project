// Generated from: features/F-03/F-03-04-006_delete.feature
import { test } from "playwright-bdd";

test.describe('バンドル削除', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
    await And('バンドル管理画面を表示する', null, { page }); 
  });
  
  test('削除ボタンクリックで確認ダイアログが表示される', { tag: ['@F-03-04-006', '@UC-017', '@正常系'] }, async ({ Given, When, Then, And, page, request }) => { 
    await Given('テスト用バンドル「TEST-BDL-DEL」が作成されている', null, { request }); 
    await And('バンドル管理画面を再表示する', null, { page }); 
    await When('バンドルカード「TEST-BDL-DEL」の「削除」ボタンをクリックする', null, { page }); 
    await Then('確認ダイアログが表示される', null, { page }); 
    await And('確認メッセージに「TEST-BDL-DEL」が含まれている', null, { page }); 
    await And('「削除する」ボタンが表示されている', null, { page }); 
    await And('「キャンセル」ボタンが表示されている', null, { page }); 
  });

  test('バンドルを削除できる', { tag: ['@F-03-04-006', '@UC-017', '@正常系'] }, async ({ Given, When, Then, And, page, request }) => { 
    await Given('テスト用バンドル「TEST-BDL-DEL2」が作成されている', null, { request }); 
    await And('バンドル管理画面を再表示する', null, { page }); 
    await When('バンドルカード「TEST-BDL-DEL2」の「削除」ボタンをクリックする', null, { page }); 
    await And('確認ダイアログの「削除する」ボタンをクリックする', null, { page }); 
    await Then('成功メッセージ「バンドルを削除しました。」が表示される', null, { page }); 
    await And('バンドル一覧に「TEST-BDL-DEL2」が表示されていない', null, { page }); 
  });

  test('削除をキャンセルするとダイアログが閉じる', { tag: ['@F-03-04-006', '@UC-017', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('バンドルカード「会議室セット」の「削除」ボタンをクリックする', null, { page }); 
    await And('確認ダイアログの「キャンセル」ボタンをクリックする', null, { page }); 
    await Then('確認ダイアログが閉じている', null, { page }); 
    await And('バンドルカード「会議室セット」が表示されている', null, { page }); 
  });

  test.describe('全ロールでバンドル削除ボタンが操作できる', () => {

    test('Example #1', { tag: ['@F-03-04-006', '@UC-017', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
      await And('バンドル管理画面を表示する', null, { page }); 
      await Then('バンドルカードに「削除」ボタンが表示されている', null, { page }); 
    });

    test('Example #2', { tag: ['@F-03-04-006', '@UC-017', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "MANAGER" でログインしている', null, { page }); 
      await And('バンドル管理画面を表示する', null, { page }); 
      await Then('バンドルカードに「削除」ボタンが表示されている', null, { page }); 
    });

    test('Example #3', { tag: ['@F-03-04-006', '@UC-017', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "BUYER" でログインしている', null, { page }); 
      await And('バンドル管理画面を表示する', null, { page }); 
      await Then('バンドルカードに「削除」ボタンが表示されている', null, { page }); 
    });

    test('Example #4', { tag: ['@F-03-04-006', '@UC-017', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "WAREHOUSE_STAFF" でログインしている', null, { page }); 
      await And('バンドル管理画面を表示する', null, { page }); 
      await Then('バンドルカードに「削除」ボタンが表示されている', null, { page }); 
    });

    test('Example #5', { tag: ['@F-03-04-006', '@UC-017', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "VIEWER" でログインしている', null, { page }); 
      await And('バンドル管理画面を表示する', null, { page }); 
      await Then('バンドルカードに「削除」ボタンが表示されている', null, { page }); 
    });

  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, request }) => $runScenarioHooks('before', { request }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-04-006_delete.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":15,"tags":["@F-03-04-006","@UC-017","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"Given テスト用バンドル「TEST-BDL-DEL」が作成されている","stepMatchArguments":[{"group":{"start":9,"value":"TEST-BDL-DEL","children":[]}}]},{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を再表示する","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When バンドルカード「TEST-BDL-DEL」の「削除」ボタンをクリックする","stepMatchArguments":[{"group":{"start":8,"value":"TEST-BDL-DEL","children":[]}}]},{"pwStepLine":16,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then 確認ダイアログが表示される","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And 確認メッセージに「TEST-BDL-DEL」が含まれている","stepMatchArguments":[{"group":{"start":9,"value":"TEST-BDL-DEL","children":[]}}]},{"pwStepLine":18,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And 「削除する」ボタンが表示されている","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And 「キャンセル」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":22,"pickleLine":25,"tags":["@F-03-04-006","@UC-017","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":26,"keywordType":"Context","textWithKeyword":"Given テスト用バンドル「TEST-BDL-DEL2」が作成されている","stepMatchArguments":[{"group":{"start":9,"value":"TEST-BDL-DEL2","children":[]}}]},{"pwStepLine":24,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を再表示する","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When バンドルカード「TEST-BDL-DEL2」の「削除」ボタンをクリックする","stepMatchArguments":[{"group":{"start":8,"value":"TEST-BDL-DEL2","children":[]}}]},{"pwStepLine":26,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"And 確認ダイアログの「削除する」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then 成功メッセージ「バンドルを削除しました。」が表示される","stepMatchArguments":[{"group":{"start":8,"value":"バンドルを削除しました。","children":[]}}]},{"pwStepLine":28,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"And バンドル一覧に「TEST-BDL-DEL2」が表示されていない","stepMatchArguments":[{"group":{"start":8,"value":"TEST-BDL-DEL2","children":[]}}]}]},
  {"pwTestLine":31,"pickleLine":34,"tags":["@F-03-04-006","@UC-017","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"When バンドルカード「会議室セット」の「削除」ボタンをクリックする","stepMatchArguments":[{"group":{"start":8,"value":"会議室セット","children":[]}}]},{"pwStepLine":33,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"And 確認ダイアログの「キャンセル」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Then 確認ダイアログが閉じている","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"And バンドルカード「会議室セット」が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"会議室セット","children":[]}}]}]},
  {"pwTestLine":40,"pickleLine":50,"tags":["@F-03-04-006","@UC-017","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":44,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":42,"gherkinStepLine":45,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"Then バンドルカードに「削除」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":46,"pickleLine":51,"tags":["@F-03-04-006","@UC-017","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":44,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"MANAGER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"MANAGER\"","children":[{"start":10,"value":"MANAGER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":48,"gherkinStepLine":45,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"Then バンドルカードに「削除」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":52,"pickleLine":52,"tags":["@F-03-04-006","@UC-017","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":44,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"BUYER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"BUYER\"","children":[{"start":10,"value":"BUYER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":54,"gherkinStepLine":45,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"Then バンドルカードに「削除」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":58,"pickleLine":53,"tags":["@F-03-04-006","@UC-017","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":44,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"WAREHOUSE_STAFF\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"WAREHOUSE_STAFF\"","children":[{"start":10,"value":"WAREHOUSE_STAFF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":60,"gherkinStepLine":45,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"Then バンドルカードに「削除」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":64,"pickleLine":54,"tags":["@F-03-04-006","@UC-017","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":44,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"VIEWER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"VIEWER\"","children":[{"start":10,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":66,"gherkinStepLine":45,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"Then バンドルカードに「削除」ボタンが表示されている","stepMatchArguments":[]}]},
]; // bdd-data-end