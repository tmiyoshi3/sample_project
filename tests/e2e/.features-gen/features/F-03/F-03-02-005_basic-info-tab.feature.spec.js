// Generated from: features/F-03/F-03-02-005_basic-info-tab.feature
import { test } from "playwright-bdd";

test.describe('基本情報タブの表示', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
  });
  
  test('基本情報タブがデフォルトで選択されている', { tag: ['@F-03-02-005', '@F-03-02-006', '@F-03-02-007', '@F-03-02-008', '@F-03-02-009', '@UC-010', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('製品ID "1" の製品詳細画面にアクセスする', null, { page }); 
    await Then('基本情報タブが選択されている', null, { page }); 
    await And('製品名「Dell OptiPlex 7010 SFF」が基本情報に表示されている', null, { page }); 
    await And('SKUが基本情報に表示されている', null, { page }); 
    await And('説明が基本情報に表示されている', null, { page }); 
    await And('カテゴリ「デスクトップPC」が基本情報に表示されている', null, { page }); 
    await And('メーカー「Dell Technologies」が基本情報に表示されている', null, { page }); 
    await And('ステータス「有効」が基本情報に表示されている', null, { page }); 
  });

  test('INACTIVE製品のステータスが「無効」と表示される', { tag: ['@F-03-02-005', '@F-03-02-006', '@F-03-02-007', '@F-03-02-008', '@F-03-02-009', '@UC-010', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('製品ID "5" の製品詳細画面にアクセスする', null, { page }); 
    await Then('ステータス「無効」が基本情報に表示されている', null, { page }); 
  });

  test('DISCONTINUED製品のステータスが「廃番」と表示される', { tag: ['@F-03-02-005', '@F-03-02-006', '@F-03-02-007', '@F-03-02-008', '@F-03-02-009', '@UC-010', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('製品ID "15" の製品詳細画面にアクセスする', null, { page }); 
    await Then('ステータス「廃番」が基本情報に表示されている', null, { page }); 
  });

  test('他タブから基本情報タブに切り替えできる', { tag: ['@F-03-02-005', '@F-03-02-006', '@F-03-02-007', '@F-03-02-008', '@F-03-02-009', '@UC-010', '@正常系'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('製品ID "1" の製品詳細画面を表示している', null, { page }); 
    await And('「仕様」タブをクリックしている', null, { page }); 
    await When('「基本情報」タブをクリックする', null, { page }); 
    await Then('基本情報タブが選択されている', null, { page }); 
  });

  test('価格・数量セクションが表示される', { tag: ['@F-03-02-005', '@F-03-02-006', '@F-03-02-007', '@F-03-02-008', '@F-03-02-009', '@UC-010', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('製品ID "1" の製品詳細画面にアクセスする', null, { page }); 
    await Then('単価「¥148,000」が表示されている', null, { page }); 
    await And('単位が表示されている', null, { page }); 
    await And('最低発注数が表示されている', null, { page }); 
    await And('リードタイムが表示されている', null, { page }); 
  });

  test('重量が設定されている製品で重量が表示される', { tag: ['@F-03-02-005', '@F-03-02-006', '@F-03-02-007', '@F-03-02-008', '@F-03-02-009', '@UC-010', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('製品ID "1" の製品詳細画面にアクセスする', null, { page }); 
    await Then('重量「5 kg」が表示されている', null, { page }); 
  });

  test('寸法がAPIレスポンスに含まれない場合「-」が表示される', { tag: ['@F-03-02-005', '@F-03-02-006', '@F-03-02-007', '@F-03-02-008', '@F-03-02-009', '@UC-010', '@正常系'] }, async ({ When, Then, page }) => { 
    await When('製品ID "1" の製品詳細画面にアクセスする', null, { page }); 
    await Then('寸法「-」が表示されている', null, { page }); 
  });

  test('在庫なしの製品で在庫状況がすべて0と表示される', { tag: ['@F-03-02-005', '@F-03-02-006', '@F-03-02-007', '@F-03-02-008', '@F-03-02-009', '@UC-010', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('製品ID "1" の製品詳細画面にアクセスする', null, { page }); 
    await Then('合計在庫「0」が表示されている', null, { page }); 
    await And('予約済み「0」が表示されている', null, { page }); 
    await And('利用可能「0」が表示されている', null, { page }); 
  });

  test.skip('在庫ありの製品で在庫状況に0以外の値が表示される', { tag: ['@F-03-02-005', '@F-03-02-006', '@F-03-02-007', '@F-03-02-008', '@F-03-02-009', '@UC-010', '@正常系', '@skip'] }, async ({ When, Then }) => { 
    await When('製品ID "7" の製品詳細画面にアクセスする'); 
    await Then('合計在庫に0以外の値が表示されている'); 
  });

  test('管理情報セクションが表示される', { tag: ['@F-03-02-005', '@F-03-02-006', '@F-03-02-007', '@F-03-02-008', '@F-03-02-009', '@UC-010', '@正常系'] }, async ({ When, Then, And, page }) => { 
    await When('製品ID "1" の製品詳細画面にアクセスする', null, { page }); 
    await Then('登録日が表示されている', null, { page }); 
    await And('最終更新日が表示されている', null, { page }); 
    await And('備考が表示されている', null, { page }); 
  });

  test('説明が未設定の製品で「-」が表示される', { tag: ['@F-03-02-005', '@F-03-02-006', '@F-03-02-007', '@F-03-02-008', '@F-03-02-009', '@UC-010', '@データ状態'] }, async ({ When, Then, page, request }) => { 
    await When('説明が未設定の製品の製品詳細画面にアクセスする', null, { page, request }); 
    await Then('説明「-」が基本情報に表示されている', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-02-005_basic-info-tab.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":13,"tags":["@F-03-02-005","@F-03-02-006","@F-03-02-007","@F-03-02-008","@F-03-02-009","@UC-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When 製品ID \"1\" の製品詳細画面にアクセスする","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then 基本情報タブが選択されている","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And 製品名「Dell OptiPlex 7010 SFF」が基本情報に表示されている","stepMatchArguments":[{"group":{"start":4,"value":"Dell OptiPlex 7010 SFF","children":[]}}]},{"pwStepLine":15,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And SKUが基本情報に表示されている","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And 説明が基本情報に表示されている","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And カテゴリ「デスクトップPC」が基本情報に表示されている","stepMatchArguments":[{"group":{"start":5,"value":"デスクトップPC","children":[]}}]},{"pwStepLine":18,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And メーカー「Dell Technologies」が基本情報に表示されている","stepMatchArguments":[{"group":{"start":5,"value":"Dell Technologies","children":[]}}]},{"pwStepLine":19,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And ステータス「有効」が基本情報に表示されている","stepMatchArguments":[{"group":{"start":6,"value":"有効","children":[]}}]}]},
  {"pwTestLine":22,"pickleLine":24,"tags":["@F-03-02-005","@F-03-02-006","@F-03-02-007","@F-03-02-008","@F-03-02-009","@UC-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"When 製品ID \"5\" の製品詳細画面にアクセスする","stepMatchArguments":[{"group":{"start":5,"value":"\"5\"","children":[{"start":6,"value":"5","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":24,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then ステータス「無効」が基本情報に表示されている","stepMatchArguments":[{"group":{"start":6,"value":"無効","children":[]}}]}]},
  {"pwTestLine":27,"pickleLine":29,"tags":["@F-03-02-005","@F-03-02-006","@F-03-02-007","@F-03-02-008","@F-03-02-009","@UC-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When 製品ID \"15\" の製品詳細画面にアクセスする","stepMatchArguments":[{"group":{"start":5,"value":"\"15\"","children":[{"start":6,"value":"15","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":29,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Then ステータス「廃番」が基本情報に表示されている","stepMatchArguments":[{"group":{"start":6,"value":"廃番","children":[]}}]}]},
  {"pwTestLine":32,"pickleLine":34,"tags":["@F-03-02-005","@F-03-02-006","@F-03-02-007","@F-03-02-008","@F-03-02-009","@UC-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":35,"keywordType":"Context","textWithKeyword":"Given 製品ID \"1\" の製品詳細画面を表示している","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":34,"gherkinStepLine":36,"keywordType":"Context","textWithKeyword":"And 「仕様」タブをクリックしている","stepMatchArguments":[{"group":{"start":1,"value":"仕様","children":[]}}]},{"pwStepLine":35,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"When 「基本情報」タブをクリックする","stepMatchArguments":[{"group":{"start":1,"value":"基本情報","children":[]}}]},{"pwStepLine":36,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"Then 基本情報タブが選択されている","stepMatchArguments":[]}]},
  {"pwTestLine":39,"pickleLine":43,"tags":["@F-03-02-005","@F-03-02-006","@F-03-02-007","@F-03-02-008","@F-03-02-009","@UC-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":44,"keywordType":"Action","textWithKeyword":"When 製品ID \"1\" の製品詳細画面にアクセスする","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":41,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"Then 単価「¥148,000」が表示されている","stepMatchArguments":[{"group":{"start":3,"value":"¥148,000","children":[]}}]},{"pwStepLine":42,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"And 単位が表示されている","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"And 最低発注数が表示されている","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"And リードタイムが表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":47,"pickleLine":53,"tags":["@F-03-02-005","@F-03-02-006","@F-03-02-007","@F-03-02-008","@F-03-02-009","@UC-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"When 製品ID \"1\" の製品詳細画面にアクセスする","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":49,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then 重量「5 kg」が表示されている","stepMatchArguments":[{"group":{"start":3,"value":"5 kg","children":[]}}]}]},
  {"pwTestLine":52,"pickleLine":58,"tags":["@F-03-02-005","@F-03-02-006","@F-03-02-007","@F-03-02-008","@F-03-02-009","@UC-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"When 製品ID \"1\" の製品詳細画面にアクセスする","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":54,"gherkinStepLine":60,"keywordType":"Outcome","textWithKeyword":"Then 寸法「-」が表示されている","stepMatchArguments":[{"group":{"start":3,"value":"-","children":[]}}]}]},
  {"pwTestLine":57,"pickleLine":65,"tags":["@F-03-02-005","@F-03-02-006","@F-03-02-007","@F-03-02-008","@F-03-02-009","@UC-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"When 製品ID \"1\" の製品詳細画面にアクセスする","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":59,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then 合計在庫「0」が表示されている","stepMatchArguments":[{"group":{"start":5,"value":"0","children":[]}}]},{"pwStepLine":60,"gherkinStepLine":68,"keywordType":"Outcome","textWithKeyword":"And 予約済み「0」が表示されている","stepMatchArguments":[{"group":{"start":5,"value":"0","children":[]}}]},{"pwStepLine":61,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"And 利用可能「0」が表示されている","stepMatchArguments":[{"group":{"start":5,"value":"0","children":[]}}]}]},
  {"pwTestLine":64,"pickleLine":72,"skipped":true,"tags":["@F-03-02-005","@F-03-02-006","@F-03-02-007","@F-03-02-008","@F-03-02-009","@UC-010","@正常系","@skip"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true},{"pwStepLine":65,"gherkinStepLine":74,"keywordType":"Action","textWithKeyword":"When 製品ID \"7\" の製品詳細画面にアクセスする"},{"pwStepLine":66,"gherkinStepLine":75,"keywordType":"Outcome","textWithKeyword":"Then 合計在庫に0以外の値が表示されている"}]},
  {"pwTestLine":69,"pickleLine":80,"tags":["@F-03-02-005","@F-03-02-006","@F-03-02-007","@F-03-02-008","@F-03-02-009","@UC-010","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":81,"keywordType":"Action","textWithKeyword":"When 製品ID \"1\" の製品詳細画面にアクセスする","stepMatchArguments":[{"group":{"start":5,"value":"\"1\"","children":[{"start":6,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":71,"gherkinStepLine":82,"keywordType":"Outcome","textWithKeyword":"Then 登録日が表示されている","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":83,"keywordType":"Outcome","textWithKeyword":"And 最終更新日が表示されている","stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":84,"keywordType":"Outcome","textWithKeyword":"And 備考が表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":76,"pickleLine":90,"tags":["@F-03-02-005","@F-03-02-006","@F-03-02-007","@F-03-02-008","@F-03-02-009","@UC-010","@データ状態"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":77,"gherkinStepLine":91,"keywordType":"Action","textWithKeyword":"When 説明が未設定の製品の製品詳細画面にアクセスする","stepMatchArguments":[]},{"pwStepLine":78,"gherkinStepLine":92,"keywordType":"Outcome","textWithKeyword":"Then 説明「-」が基本情報に表示されている","stepMatchArguments":[{"group":{"start":3,"value":"-","children":[]}}]}]},
]; // bdd-data-end