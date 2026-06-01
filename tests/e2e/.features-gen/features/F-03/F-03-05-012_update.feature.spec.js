// Generated from: features/F-03/F-03-05-012_update.feature
import { test } from "playwright-bdd";

test.describe('更新実行', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test('製品情報を更新して詳細画面に遷移する', { tag: ['@F-03-05-012', '@正常系'] }, async ({ Given, When, Then, And, page, request }) => { 
    await Given('テスト用製品の編集画面にアクセスしている', null, { page, request }); 
    await When('製品名を "更新後の製品名" に変更する', null, { page }); 
    await And('「更新する」ボタンをクリックする', null, { page }); 
    await Then('製品詳細画面が表示される', null, { page }); 
  });

  test('必須項目を空にして更新するとバリデーションエラー', { tag: ['@F-03-05-012', '@バリデーション'] }, async ({ Given, When, Then, And, page, request }) => { 
    await Given('テスト用製品の編集画面にアクセスしている', null, { page, request }); 
    await When('製品名を空にする', null, { page }); 
    await And('「更新する」ボタンをクリックする', null, { page }); 
    await Then('「製品名は必須です」が表示される', null, { page }); 
  });

  test('SKUを他製品と重複する値に変更するとエラー', { tag: ['@F-03-05-012', '@バリデーション'] }, async ({ Given, When, Then, page, request }) => { 
    await Given('テスト用製品の編集画面にアクセスしている', null, { page, request }); 
    await When('SKUを既存の他製品のSKUに変更する', null, { page }); 
    await Then('SKU重複エラーメッセージが表示される', null, { page }); 
  });

  test.describe('全ロールで編集画面にアクセスできる', () => {

    test('Example #1', { tag: ['@F-03-05-012', '@権限'] }, async ({ Given, When, Then, page, request }) => { 
      await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
      await When('テスト用製品の編集画面にアクセスする', null, { page, request }); 
      await Then('ページタイトル「製品編集」が表示される', null, { page }); 
    });

    test('Example #2', { tag: ['@F-03-05-012', '@権限'] }, async ({ Given, When, Then, page, request }) => { 
      await Given('テスト用ユーザー "MANAGER" でログインしている', null, { page }); 
      await When('テスト用製品の編集画面にアクセスする', null, { page, request }); 
      await Then('ページタイトル「製品編集」が表示される', null, { page }); 
    });

    test('Example #3', { tag: ['@F-03-05-012', '@権限'] }, async ({ Given, When, Then, page, request }) => { 
      await Given('テスト用ユーザー "BUYER" でログインしている', null, { page }); 
      await When('テスト用製品の編集画面にアクセスする', null, { page, request }); 
      await Then('ページタイトル「製品編集」が表示される', null, { page }); 
    });

    test('Example #4', { tag: ['@F-03-05-012', '@権限'] }, async ({ Given, When, Then, page, request }) => { 
      await Given('テスト用ユーザー "WAREHOUSE_STAFF" でログインしている', null, { page }); 
      await When('テスト用製品の編集画面にアクセスする', null, { page, request }); 
      await Then('ページタイトル「製品編集」が表示される', null, { page }); 
    });

    test('Example #5', { tag: ['@F-03-05-012', '@権限'] }, async ({ Given, When, Then, page, request }) => { 
      await Given('テスト用ユーザー "VIEWER" でログインしている', null, { page }); 
      await When('テスト用製品の編集画面にアクセスする', null, { page, request }); 
      await Then('ページタイトル「製品編集」が表示される', null, { page }); 
    });

  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, request }) => $runScenarioHooks('before', { request }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-05-012_update.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":13,"tags":["@F-03-05-012","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Given テスト用製品の編集画面にアクセスしている","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When 製品名を \"更新後の製品名\" に変更する","stepMatchArguments":[{"group":{"start":6,"value":"更新後の製品名","children":[]}}]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"And 「更新する」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then 製品詳細画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":18,"pickleLine":22,"tags":["@F-03-05-012","@バリデーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"Given テスト用製品の編集画面にアクセスしている","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"When 製品名を空にする","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"And 「更新する」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then 「製品名は必須です」が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":25,"pickleLine":29,"tags":["@F-03-05-012","@バリデーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":30,"keywordType":"Context","textWithKeyword":"Given テスト用製品の編集画面にアクセスしている","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"When SKUを既存の他製品のSKUに変更する","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then SKU重複エラーメッセージが表示される","stepMatchArguments":[]}]},
  {"pwTestLine":33,"pickleLine":47,"tags":["@F-03-05-012","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":35,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When テスト用製品の編集画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then ページタイトル「製品編集」が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":39,"pickleLine":48,"tags":["@F-03-05-012","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"MANAGER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"MANAGER\"","children":[{"start":10,"value":"MANAGER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":41,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When テスト用製品の編集画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then ページタイトル「製品編集」が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":45,"pickleLine":49,"tags":["@F-03-05-012","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"BUYER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"BUYER\"","children":[{"start":10,"value":"BUYER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":47,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When テスト用製品の編集画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then ページタイトル「製品編集」が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":51,"pickleLine":50,"tags":["@F-03-05-012","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"WAREHOUSE_STAFF\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"WAREHOUSE_STAFF\"","children":[{"start":10,"value":"WAREHOUSE_STAFF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":53,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When テスト用製品の編集画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then ページタイトル「製品編集」が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":57,"pickleLine":51,"tags":["@F-03-05-012","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"VIEWER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"VIEWER\"","children":[{"start":10,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":59,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When テスト用製品の編集画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then ページタイトル「製品編集」が表示される","stepMatchArguments":[]}]},
]; // bdd-data-end