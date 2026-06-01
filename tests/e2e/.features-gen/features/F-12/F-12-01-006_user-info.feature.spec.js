// Generated from: features/F-12/F-12-01-006_user-info.feature
import { test } from "playwright-bdd";

test.describe('自身のログイン状態とロールを確認する', () => {

  test.beforeEach('Background', async ({ Given }, testInfo) => { if (testInfo.error) return;
    await Given('テストデータが初期化されている'); 
  });
  
  test('ヘッダーにユーザー名が表示される', { tag: ['@F-12-01-006', '@UC-004', '@正常系'] }, async ({ Given, Then, page }) => { 
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await Then('ヘッダーにユーザー名が表示されている', null, { page }); 
  });

  test('ユーザーメニューにユーザー名とロールが表示される', { tag: ['@F-12-01-006', '@UC-004', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await When('ユーザーメニューを開く', null, { page }); 
    await Then('ユーザーメニューにユーザー名が表示されている', null, { page }); 
    await And('ユーザーメニューにロール名が表示されている', null, { page }); 
  });

  test.skip('ユーザーメニュー外クリックでメニューが閉じる', { tag: ['@F-12-01-006', '@UC-004', '@正常系', '@skip'] }, async ({ Given, When, Then, And }) => { 
    await Given('テスト用ユーザー "ADMIN" でログインしている'); 
    await And('ユーザーメニューが開いている'); 
    await When('ユーザーメニュー以外の領域をクリックする'); 
    await Then('ユーザーメニューが閉じている'); 
  });

  test('設定リンクから管理者設定画面に遷移する', { tag: ['@F-12-01-006', '@UC-004', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await When('ユーザーメニューを開く', null, { page }); 
    await And('設定リンクをクリックする', null, { page }); 
    await Then('管理者設定画面が表示される', null, { page }); 
  });

  test('Keycloakプロファイル取得失敗時はフォールバック表示になる', { tag: ['@F-12-01-006', '@UC-004', '@エラー'] }, async ({ Given, Then, And, page }) => { 
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('Keycloakプロファイルの取得に失敗している'); 
    await Then('ヘッダーにフォールバックのユーザー名が表示されている', null, { page }); 
  });

  test.describe('各ロールのユーザーの名前とロールが表示される', () => {

    test('Example #1', { tag: ['@F-12-01-006', '@UC-004', '@権限'] }, async ({ Given, When, Then, page }) => { 
      await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
      await When('ユーザーメニューを開く', null, { page }); 
      await Then('ユーザーメニューにロール名が表示されている', null, { page }); 
    });

    test('Example #2', { tag: ['@F-12-01-006', '@UC-004', '@権限'] }, async ({ Given, When, Then, page }) => { 
      await Given('テスト用ユーザー "MANAGER" でログインしている', null, { page }); 
      await When('ユーザーメニューを開く', null, { page }); 
      await Then('ユーザーメニューにロール名が表示されている', null, { page }); 
    });

    test('Example #3', { tag: ['@F-12-01-006', '@UC-004', '@権限'] }, async ({ Given, When, Then, page }) => { 
      await Given('テスト用ユーザー "BUYER" でログインしている', null, { page }); 
      await When('ユーザーメニューを開く', null, { page }); 
      await Then('ユーザーメニューにロール名が表示されている', null, { page }); 
    });

    test('Example #4', { tag: ['@F-12-01-006', '@UC-004', '@権限'] }, async ({ Given, When, Then, page }) => { 
      await Given('テスト用ユーザー "WAREHOUSE_STAFF" でログインしている', null, { page }); 
      await When('ユーザーメニューを開く', null, { page }); 
      await Then('ユーザーメニューにロール名が表示されている', null, { page }); 
    });

    test('Example #5', { tag: ['@F-12-01-006', '@UC-004', '@権限'] }, async ({ Given, When, Then, page }) => { 
      await Given('テスト用ユーザー "VIEWER" でログインしている', null, { page }); 
      await When('ユーザーメニューを開く', null, { page }); 
      await Then('ユーザーメニューにロール名が表示されている', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-12/F-12-01-006_user-info.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":12,"tags":["@F-12-01-006","@UC-004","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then ヘッダーにユーザー名が表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":15,"pickleLine":17,"tags":["@F-12-01-006","@UC-004","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":18,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"When ユーザーメニューを開く","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then ユーザーメニューにユーザー名が表示されている","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And ユーザーメニューにロール名が表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":22,"pickleLine":24,"skipped":true,"tags":["@F-12-01-006","@UC-004","@正常系","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true},{"pwStepLine":23,"gherkinStepLine":26,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている"},{"pwStepLine":24,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"And ユーザーメニューが開いている"},{"pwStepLine":25,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When ユーザーメニュー以外の領域をクリックする"},{"pwStepLine":26,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then ユーザーメニューが閉じている"}]},
  {"pwTestLine":29,"pickleLine":32,"tags":["@F-12-01-006","@UC-004","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":31,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When ユーザーメニューを開く","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"And 設定リンクをクリックする","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"Then 管理者設定画面が表示される","stepMatchArguments":[]}]},
  {"pwTestLine":36,"pickleLine":41,"tags":["@F-12-01-006","@UC-004","@エラー"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":42,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":38,"gherkinStepLine":43,"keywordType":"Context","textWithKeyword":"And Keycloakプロファイルの取得に失敗している","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"Then ヘッダーにフォールバックのユーザー名が表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":44,"pickleLine":57,"tags":["@F-12-01-006","@UC-004","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":46,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When ユーザーメニューを開く","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then ユーザーメニューにロール名が表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":50,"pickleLine":58,"tags":["@F-12-01-006","@UC-004","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"MANAGER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"MANAGER\"","children":[{"start":10,"value":"MANAGER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":52,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When ユーザーメニューを開く","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then ユーザーメニューにロール名が表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":56,"pickleLine":59,"tags":["@F-12-01-006","@UC-004","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"BUYER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"BUYER\"","children":[{"start":10,"value":"BUYER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":58,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When ユーザーメニューを開く","stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then ユーザーメニューにロール名が表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":62,"pickleLine":60,"tags":["@F-12-01-006","@UC-004","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"WAREHOUSE_STAFF\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"WAREHOUSE_STAFF\"","children":[{"start":10,"value":"WAREHOUSE_STAFF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":64,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When ユーザーメニューを開く","stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then ユーザーメニューにロール名が表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":68,"pickleLine":61,"tags":["@F-12-01-006","@UC-004","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"VIEWER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"VIEWER\"","children":[{"start":10,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":70,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When ユーザーメニューを開く","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then ユーザーメニューにロール名が表示されている","stepMatchArguments":[]}]},
]; // bdd-data-end