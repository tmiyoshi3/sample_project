// Generated from: features/F-02/F-02-01-002_inventory-alerts.feature
import { test } from "playwright-bdd";

test.describe('在庫不足検知', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('ダッシュボード画面が表示されている', null, { page }); 
  });
  
  test('在庫不足がない場合のアラート表示', { tag: ['@F-02-01-002', '@F-02-01-009', '@F-02-01-010', '@UC-005', '@正常系'] }, async ({ Given, Then, And, page }) => { 
    await Given('在庫不足の製品が存在しない'); 
    await Then('"在庫アラート" カードのメイン値が "0" である', null, { page }); 
    await And('在庫アラートセクションに "在庫アラートはありません" と表示されている', null, { page }); 
  });

  test.skip('在庫不足がある場合のアラートカード表示', { tag: ['@F-02-01-002', '@F-02-01-009', '@F-02-01-010', '@UC-005', '@正常系', '@skip'] }, async ({ Given, Then, And }) => { 
    await Given('在庫不足の製品が存在する'); 
    await Then('"在庫アラート" カードのメイン値が0より大きい'); 
    await And('"在庫アラート" カードが強調表示されている'); 
  });

  test.skip('在庫不足がある場合のアラートリスト表示', { tag: ['@F-02-01-002', '@F-02-01-009', '@F-02-01-010', '@UC-005', '@正常系', '@skip'] }, async ({ Given, Then, And }) => { 
    await Given('在庫不足の製品が存在する'); 
    await Then('在庫アラートセクションに製品名が表示されている'); 
    await And('在庫アラートセクションに製品SKUが表示されている'); 
    await And('在庫アラートセクションに現在在庫数が表示されている'); 
    await And('在庫アラートセクションに最低在庫数が表示されている'); 
    await And('在庫アラートセクションに在庫バーが表示されている'); 
  });

  test('在庫アラートカードをクリックすると在庫管理画面に遷移する', { tag: ['@F-02-01-002', '@F-02-01-009', '@F-02-01-010', '@UC-005', '@ナビゲーション'] }, async ({ When, Then, page }) => { 
    await When('"在庫アラート" カードをクリックする', null, { page }); 
    await Then('在庫管理画面に遷移する', null, { page }); 
  });

  test('在庫アラートセクションのすべて表示リンクで在庫管理画面に遷移する', { tag: ['@F-02-01-002', '@F-02-01-009', '@F-02-01-010', '@UC-005', '@ナビゲーション'] }, async ({ When, Then, page }) => { 
    await When('在庫アラートセクションの "すべて表示" リンクをクリックする', null, { page }); 
    await Then('在庫管理画面に遷移する', null, { page }); 
  });

  test.skip('在庫アラートの製品をクリックすると製品詳細画面に遷移する', { tag: ['@F-02-01-002', '@F-02-01-009', '@F-02-01-010', '@UC-005', '@ナビゲーション', '@skip'] }, async ({ Given, When, Then }) => { 
    await Given('在庫不足の製品が存在する'); 
    await When('在庫アラートセクションの製品をクリックする'); 
    await Then('該当製品の製品詳細画面に遷移する'); 
  });

  test.skip('在庫バーのcritical表示', { tag: ['@F-02-01-002', '@F-02-01-009', '@F-02-01-010', '@UC-005', '@データ状態', '@skip'] }, async ({ Given, Then }) => { 
    await Given('在庫数が最低在庫数の50%以下の製品が存在する'); 
    await Then('該当製品の在庫バーがcritical表示になっている'); 
  });

  test.skip('在庫バーのwarning表示', { tag: ['@F-02-01-002', '@F-02-01-009', '@F-02-01-010', '@UC-005', '@データ状態', '@skip'] }, async ({ Given, Then }) => { 
    await Given('在庫数が最低在庫数以下かつ50%超の製品が存在する'); 
    await Then('該当製品の在庫バーがwarning表示になっている'); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-02/F-02-01-002_inventory-alerts.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":12,"tags":["@F-02-01-002","@F-02-01-009","@F-02-01-010","@UC-005","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Given 在庫不足の製品が存在しない","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then \"在庫アラート\" カードのメイン値が \"0\" である","stepMatchArguments":[{"group":{"start":0,"value":"\"在庫アラート\"","children":[{"start":1,"value":"在庫アラート","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":19,"value":"\"0\"","children":[{"start":20,"value":"0","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And 在庫アラートセクションに \"在庫アラートはありません\" と表示されている","stepMatchArguments":[{"group":{"start":13,"value":"\"在庫アラートはありません\"","children":[{"start":14,"value":"在庫アラートはありません","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":17,"pickleLine":18,"skipped":true,"tags":["@F-02-01-002","@F-02-01-009","@F-02-01-010","@UC-005","@正常系","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true},{"pwStepLine":18,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given 在庫不足の製品が存在する"},{"pwStepLine":19,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then \"在庫アラート\" カードのメイン値が0より大きい"},{"pwStepLine":20,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And \"在庫アラート\" カードが強調表示されている"}]},
  {"pwTestLine":23,"pickleLine":24,"skipped":true,"tags":["@F-02-01-002","@F-02-01-009","@F-02-01-010","@UC-005","@正常系","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true},{"pwStepLine":24,"gherkinStepLine":25,"keywordType":"Context","textWithKeyword":"Given 在庫不足の製品が存在する"},{"pwStepLine":25,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then 在庫アラートセクションに製品名が表示されている"},{"pwStepLine":26,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"And 在庫アラートセクションに製品SKUが表示されている"},{"pwStepLine":27,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"And 在庫アラートセクションに現在在庫数が表示されている"},{"pwStepLine":28,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"And 在庫アラートセクションに最低在庫数が表示されている"},{"pwStepLine":29,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And 在庫アラートセクションに在庫バーが表示されている"}]},
  {"pwTestLine":32,"pickleLine":35,"tags":["@F-02-01-002","@F-02-01-009","@F-02-01-010","@UC-005","@ナビゲーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"When \"在庫アラート\" カードをクリックする","stepMatchArguments":[{"group":{"start":0,"value":"\"在庫アラート\"","children":[{"start":1,"value":"在庫アラート","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":34,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Then 在庫管理画面に遷移する","stepMatchArguments":[]}]},
  {"pwTestLine":37,"pickleLine":40,"tags":["@F-02-01-002","@F-02-01-009","@F-02-01-010","@UC-005","@ナビゲーション"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":41,"keywordType":"Action","textWithKeyword":"When 在庫アラートセクションの \"すべて表示\" リンクをクリックする","stepMatchArguments":[{"group":{"start":13,"value":"\"すべて表示\"","children":[{"start":14,"value":"すべて表示","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":39,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"Then 在庫管理画面に遷移する","stepMatchArguments":[]}]},
  {"pwTestLine":42,"pickleLine":45,"skipped":true,"tags":["@F-02-01-002","@F-02-01-009","@F-02-01-010","@UC-005","@ナビゲーション","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true},{"pwStepLine":43,"gherkinStepLine":46,"keywordType":"Context","textWithKeyword":"Given 在庫不足の製品が存在する"},{"pwStepLine":44,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"When 在庫アラートセクションの製品をクリックする"},{"pwStepLine":45,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"Then 該当製品の製品詳細画面に遷移する"}]},
  {"pwTestLine":48,"pickleLine":53,"skipped":true,"tags":["@F-02-01-002","@F-02-01-009","@F-02-01-010","@UC-005","@データ状態","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true},{"pwStepLine":49,"gherkinStepLine":54,"keywordType":"Context","textWithKeyword":"Given 在庫数が最低在庫数の50%以下の製品が存在する"},{"pwStepLine":50,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then 該当製品の在庫バーがcritical表示になっている"}]},
  {"pwTestLine":53,"pickleLine":59,"skipped":true,"tags":["@F-02-01-002","@F-02-01-009","@F-02-01-010","@UC-005","@データ状態","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"And ダッシュボード画面が表示されている","isBg":true},{"pwStepLine":54,"gherkinStepLine":60,"keywordType":"Context","textWithKeyword":"Given 在庫数が最低在庫数以下かつ50%超の製品が存在する"},{"pwStepLine":55,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then 該当製品の在庫バーがwarning表示になっている"}]},
]; // bdd-data-end