// Generated from: features/F-12/F-12-01-002_system-identity.feature
import { test } from "playwright-bdd";

test.describe('システムバージョン・識別情報を確認する', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test('ヘッダーにシステム名とサブタイトルが表示される', { tag: ['@F-12-01-002', '@F-12-02-011', '@F-12-03-001', '@UC-005', '@正常系'] }, async ({ Then, And, page }) => { 
    await Then('ヘッダーにシステム名 "ProQuip" が表示されている', null, { page }); 
    await And('ヘッダーにサブタイトル "調達・在庫管理" が表示されている', null, { page }); 
  });

  test('サイドナビゲーション展開時にバージョンが表示される', { tag: ['@F-12-01-002', '@F-12-02-011', '@F-12-03-001', '@UC-005', '@正常系'] }, async ({ Given, Then, page }) => { 
    await Given('サイドナビゲーションが展開状態である', null, { page }); 
    await Then('サイドナビゲーション下部にバージョン "v1.0.0" が表示されている', null, { page }); 
  });

  test('サイドナビゲーション折りたたみ時にバージョンが非表示になる', { tag: ['@F-12-01-002', '@F-12-02-011', '@F-12-03-001', '@UC-005', '@正常系'] }, async ({ Given, Then, page }) => { 
    await Given('サイドナビゲーションが折りたたみ状態である', null, { page }); 
    await Then('サイドナビゲーション下部にバージョンが表示されていない', null, { page }); 
  });

  test('フッターにコピーライトとバージョンが表示される', { tag: ['@F-12-01-002', '@F-12-02-011', '@F-12-03-001', '@UC-005', '@正常系'] }, async ({ Then, And, page }) => { 
    await Then('フッターに "ProQuip - 調達・在庫管理システム" が表示されている', null, { page }); 
    await And('フッターにバージョン "v1.0.0" が表示されている', null, { page }); 
    await And('フッターに現在の年のコピーライト表示がある', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-12/F-12-01-002_system-identity.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":13,"tags":["@F-12-01-002","@F-12-02-011","@F-12-03-001","@UC-005","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then ヘッダーにシステム名 \"ProQuip\" が表示されている","stepMatchArguments":[{"group":{"start":11,"value":"\"ProQuip\"","children":[{"start":12,"value":"ProQuip","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And ヘッダーにサブタイトル \"調達・在庫管理\" が表示されている","stepMatchArguments":[{"group":{"start":12,"value":"\"調達・在庫管理\"","children":[{"start":13,"value":"調達・在庫管理","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":16,"pickleLine":18,"tags":["@F-12-01-002","@F-12-02-011","@F-12-03-001","@UC-005","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given サイドナビゲーションが展開状態である","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then サイドナビゲーション下部にバージョン \"v1.0.0\" が表示されている","stepMatchArguments":[{"group":{"start":19,"value":"\"v1.0.0\"","children":[{"start":20,"value":"v1.0.0","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":21,"pickleLine":23,"tags":["@F-12-01-002","@F-12-02-011","@F-12-03-001","@UC-005","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":24,"keywordType":"Context","textWithKeyword":"Given サイドナビゲーションが折りたたみ状態である","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then サイドナビゲーション下部にバージョンが表示されていない","stepMatchArguments":[]}]},
  {"pwTestLine":26,"pickleLine":28,"tags":["@F-12-01-002","@F-12-02-011","@F-12-03-001","@UC-005","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then フッターに \"ProQuip - 調達・在庫管理システム\" が表示されている","stepMatchArguments":[{"group":{"start":6,"value":"\"ProQuip - 調達・在庫管理システム\"","children":[{"start":7,"value":"ProQuip - 調達・在庫管理システム","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":28,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And フッターにバージョン \"v1.0.0\" が表示されている","stepMatchArguments":[{"group":{"start":11,"value":"\"v1.0.0\"","children":[{"start":12,"value":"v1.0.0","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":29,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"And フッターに現在の年のコピーライト表示がある","stepMatchArguments":[]}]},
]; // bdd-data-end