// Generated from: features/F-03/F-03-02-004_delete.feature
import { test } from "playwright-bdd";

test.describe('製品の削除（論理削除）', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test('削除ボタンクリックで確認ダイアログが表示される', { tag: ['@F-03-02-004', '@UC-011', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品ID "1" の製品詳細画面を表示している', null, { page }); 
    await When('「削除」ボタンをクリックする', null, { page }); 
    await Then('確認ダイアログ「製品の削除」が表示される', null, { page }); 
    await And('確認メッセージ「この製品を削除してもよろしいですか？この操作は取り消せません。」が表示される', null, { page }); 
    await And('ダイアログに「キャンセル」ボタンが表示されている', null, { page }); 
    await And('ダイアログに「削除する」ボタンが表示されている', null, { page }); 
  });

  test('削除を実行すると製品一覧画面に遷移する', { tag: ['@F-03-02-004', '@UC-011', '@正常系'] }, async ({ Given, When, Then, And, page, request }) => { 
    await Given('テスト用ACTIVE製品が作成されている', null, { request }); 
    await And('テスト用製品の製品詳細画面を表示している', null, { page }); 
    await When('「削除」ボタンをクリックする', null, { page }); 
    await And('確認ダイアログで「削除する」ボタンをクリックする', null, { page }); 
    await Then('製品一覧画面に遷移している', null, { page }); 
  });

  test('削除キャンセルでダイアログが閉じてデータは変更されない', { tag: ['@F-03-02-004', '@UC-011', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品ID "1" の製品詳細画面を表示している', null, { page }); 
    await When('「削除」ボタンをクリックする', null, { page }); 
    await And('確認ダイアログで「キャンセル」ボタンをクリックする', null, { page }); 
    await Then('確認ダイアログが閉じている', null, { page }); 
    await And('製品詳細画面が引き続き表示されている', null, { page }); 
  });

  test('削除後に製品一覧で当該製品のステータスが「販売終了」になっている', { tag: ['@F-03-02-004', '@UC-011', '@正常系'] }, async ({ Given, When, Then, And, page, request }) => { 
    await Given('テスト用ACTIVE製品が作成されている', null, { request }); 
    await And('テスト用製品の製品詳細画面を表示している', null, { page }); 
    await When('「削除」ボタンをクリックする', null, { page }); 
    await And('確認ダイアログで「削除する」ボタンをクリックする', null, { page }); 
    await Then('製品一覧画面に遷移している', null, { page }); 
    await And('テスト用製品のステータスが「販売終了」と表示されている', null, { page }); 
  });

  test('既にDISCONTINUEDの製品を削除するとエラーメッセージが表示される', { tag: ['@F-03-02-004', '@UC-011', '@エラー'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品ID "15" の製品詳細画面を表示している', null, { page }); 
    await When('「削除」ボタンをクリックする', null, { page }); 
    await And('確認ダイアログで「削除する」ボタンをクリックする', null, { page }); 
    await Then('削除エラーメッセージ「製品の削除に失敗しました。」が表示される', null, { page }); 
  });

  test.describe('全ロールのユーザーが削除ボタンを操作できる', () => {

    test('Example #1', { tag: ['@F-03-02-004', '@UC-011', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
      await And('製品ID "1" の製品詳細画面を表示している', null, { page }); 
      await Then('「削除」ボタンが表示されている', null, { page }); 
    });

    test('Example #2', { tag: ['@F-03-02-004', '@UC-011', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "MANAGER" でログインしている', null, { page }); 
      await And('製品ID "1" の製品詳細画面を表示している', null, { page }); 
      await Then('「削除」ボタンが表示されている', null, { page }); 
    });

    test('Example #3', { tag: ['@F-03-02-004', '@UC-011', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "BUYER" でログインしている', null, { page }); 
      await And('製品ID "1" の製品詳細画面を表示している', null, { page }); 
      await Then('「削除」ボタンが表示されている', null, { page }); 
    });

    test('Example #4', { tag: ['@F-03-02-004', '@UC-011', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "WAREHOUSE_STAFF" でログインしている', null, { page }); 
      await And('製品ID "1" の製品詳細画面を表示している', null, { page }); 
      await Then('「削除」ボタンが表示されている', null, { page }); 
    });

    test('Example #5', { tag: ['@F-03-02-004', '@UC-011', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "VIEWER" でログインしている', null, { page }); 
      await And('製品ID "1" の製品詳細画面を表示している', null, { page }); 
      await Then('「削除」ボタンが表示されている', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-02-004_delete.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":13,"tags":["@F-03-02-004","@UC-011","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Given 製品ID \"1\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When 「削除」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then 確認ダイアログ「製品の削除」が表示される","stepMatchArguments":[{"group":{"start":8,"value":"製品の削除","children":[]}}]},{"pwStepLine":15,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And 確認メッセージ「この製品を削除してもよろしいですか？この操作は取り消せません。」が表示される","stepMatchArguments":[{"group":{"start":8,"value":"この製品を削除してもよろしいですか？この操作は取り消せません。","children":[]}}]},{"pwStepLine":16,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And ダイアログに「キャンセル」ボタンが表示されている","stepMatchArguments":[{"group":{"start":7,"value":"キャンセル","children":[]}}]},{"pwStepLine":17,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And ダイアログに「削除する」ボタンが表示されている","stepMatchArguments":[{"group":{"start":7,"value":"削除する","children":[]}}]}]},
  {"pwTestLine":20,"pickleLine":22,"tags":["@F-03-02-004","@UC-011","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"Given テスト用ACTIVE製品が作成されている","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":24,"keywordType":"Context","textWithKeyword":"And テスト用製品の製品詳細画面を表示している","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"When 「削除」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"And 確認ダイアログで「削除する」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then 製品一覧画面に遷移している","stepMatchArguments":[]}]},
  {"pwTestLine":28,"pickleLine":30,"tags":["@F-03-02-004","@UC-011","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":31,"keywordType":"Context","textWithKeyword":"Given 製品ID \"1\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":30,"gherkinStepLine":32,"keywordType":"Action","textWithKeyword":"When 「削除」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"And 確認ダイアログで「キャンセル」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Then 確認ダイアログが閉じている","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"And 製品詳細画面が引き続き表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":36,"pickleLine":38,"tags":["@F-03-02-004","@UC-011","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"Given テスト用ACTIVE製品が作成されている","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":40,"keywordType":"Context","textWithKeyword":"And テスト用製品の製品詳細画面を表示している","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":41,"keywordType":"Action","textWithKeyword":"When 「削除」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"And 確認ダイアログで「削除する」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then 製品一覧画面に遷移している","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"And テスト用製品のステータスが「販売終了」と表示されている","stepMatchArguments":[{"group":{"start":14,"value":"販売終了","children":[]}}]}]},
  {"pwTestLine":45,"pickleLine":49,"tags":["@F-03-02-004","@UC-011","@エラー"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":50,"keywordType":"Context","textWithKeyword":"Given 製品ID \"15\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"15\"","children":[{"start":6,"value":"15","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":47,"gherkinStepLine":51,"keywordType":"Action","textWithKeyword":"When 「削除」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"And 確認ダイアログで「削除する」ボタンをクリックする","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then 削除エラーメッセージ「製品の削除に失敗しました。」が表示される","stepMatchArguments":[{"group":{"start":11,"value":"製品の削除に失敗しました。","children":[]}}]}]},
  {"pwTestLine":54,"pickleLine":65,"tags":["@F-03-02-004","@UC-011","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":59,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":56,"gherkinStepLine":60,"keywordType":"Context","textWithKeyword":"And 製品ID \"1\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":57,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then 「削除」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":60,"pickleLine":66,"tags":["@F-03-02-004","@UC-011","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":59,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"MANAGER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"MANAGER\"","children":[{"start":10,"value":"MANAGER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":62,"gherkinStepLine":60,"keywordType":"Context","textWithKeyword":"And 製品ID \"1\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":63,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then 「削除」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":66,"pickleLine":67,"tags":["@F-03-02-004","@UC-011","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":59,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"BUYER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"BUYER\"","children":[{"start":10,"value":"BUYER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":68,"gherkinStepLine":60,"keywordType":"Context","textWithKeyword":"And 製品ID \"1\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":69,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then 「削除」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":72,"pickleLine":68,"tags":["@F-03-02-004","@UC-011","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":59,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"WAREHOUSE_STAFF\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"WAREHOUSE_STAFF\"","children":[{"start":10,"value":"WAREHOUSE_STAFF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":74,"gherkinStepLine":60,"keywordType":"Context","textWithKeyword":"And 製品ID \"1\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":75,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then 「削除」ボタンが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":78,"pickleLine":69,"tags":["@F-03-02-004","@UC-011","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":79,"gherkinStepLine":59,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"VIEWER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"VIEWER\"","children":[{"start":10,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":80,"gherkinStepLine":60,"keywordType":"Context","textWithKeyword":"And 製品ID \"1\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":81,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then 「削除」ボタンが表示されている","stepMatchArguments":[]}]},
]; // bdd-data-end