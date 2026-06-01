// Generated from: features/F-03/F-03-04-001_bundle-list.feature
import { test } from "playwright-bdd";

test.describe('バンドル一覧表示', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
    await And('テストデータが初期化されている'); 
    await And('バンドル管理画面を表示する', null, { page }); 
  });
  
  test('バンドル一覧がカード形式で表示される', { tag: ['@F-03-04-001', '@F-03-04-004', '@F-03-04-007', '@UC-015', '@正常系'] }, async ({ Then, And, page }) => { 
    await Then('バンドルカードが3件以上表示されている', null, { page }); 
    await And('バンドルカードがバンドル名の昇順で表示されている', null, { page }); 
  });

  test('バンドルカードにバンドル名と説明が表示される', { tag: ['@F-03-04-001', '@F-03-04-004', '@F-03-04-007', '@UC-015', '@正常系'] }, async ({ Then, And, page }) => { 
    await Then('バンドルカード「会議室セット」が表示されている', null, { page }); 
    await And('バンドルカード「会議室セット」に説明が表示されている', null, { page }); 
  });

  test('バンドルカードに構成製品チップが表示される', { tag: ['@F-03-04-001', '@F-03-04-004', '@F-03-04-007', '@UC-015', '@正常系'] }, async ({ Then, And, page }) => { 
    await Then('バンドルカード「会議室セット」に構成製品チップが表示されている', null, { page }); 
    await And('構成製品チップに「製品名 × 数量」形式で表示されている', null, { page }); 
  });

  test('バンドルカードに価格情報が表示される', { tag: ['@F-03-04-001', '@F-03-04-004', '@F-03-04-007', '@UC-015', '@正常系'] }, async ({ Then, And, page }) => { 
    await Then('バンドルカード「会議室セット」に定価合計が打ち消し線付きで表示されている', null, { page }); 
    await And('バンドルカード「会議室セット」に割引率が表示されている', null, { page }); 
    await And('バンドルカード「会議室セット」にバンドル価格が表示されている', null, { page }); 
  });

  test('ACTIVEステータスバッジが表示される', { tag: ['@F-03-04-001', '@F-03-04-004', '@F-03-04-007', '@UC-015', '@正常系'] }, async ({ Then, page }) => { 
    await Then('バンドルカード「会議室セット」にステータスバッジ「有効」が表示されている', null, { page }); 
  });

  test('INACTIVEステータスバッジが表示される', { tag: ['@F-03-04-001', '@F-03-04-004', '@F-03-04-007', '@UC-015', '@正常系'] }, async ({ Given, Then, page, request }) => { 
    await Given('テスト用バンドル「TEST-BDL-INACTIVE」がINACTIVEステータスで作成されている', null, { page, request }); 
    await Then('バンドルカード「TEST-BDL-INACTIVE」にステータスバッジ「無効」が表示されている', null, { page }); 
  });

  test('DRAFTステータスバッジが表示される', { tag: ['@F-03-04-001', '@F-03-04-004', '@F-03-04-007', '@UC-015', '@正常系'] }, async ({ Given, Then, page, request }) => { 
    await Given('テスト用バンドル「TEST-BDL-DRAFT」がDRAFTステータスで作成されている', null, { page, request }); 
    await Then('バンドルカード「TEST-BDL-DRAFT」にステータスバッジ「下書き」が表示されている', null, { page }); 
  });

  test.describe('全ロールでバンドル一覧が表示される', () => {

    test('Example #1', { tag: ['@F-03-04-001', '@F-03-04-004', '@F-03-04-007', '@UC-015', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "ADMIN" でログインしている', null, { page }); 
      await And('バンドル管理画面を表示する', null, { page }); 
      await Then('バンドルカードが3件以上表示されている', null, { page }); 
    });

    test('Example #2', { tag: ['@F-03-04-001', '@F-03-04-004', '@F-03-04-007', '@UC-015', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "MANAGER" でログインしている', null, { page }); 
      await And('バンドル管理画面を表示する', null, { page }); 
      await Then('バンドルカードが3件以上表示されている', null, { page }); 
    });

    test('Example #3', { tag: ['@F-03-04-001', '@F-03-04-004', '@F-03-04-007', '@UC-015', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "BUYER" でログインしている', null, { page }); 
      await And('バンドル管理画面を表示する', null, { page }); 
      await Then('バンドルカードが3件以上表示されている', null, { page }); 
    });

    test('Example #4', { tag: ['@F-03-04-001', '@F-03-04-004', '@F-03-04-007', '@UC-015', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "WAREHOUSE_STAFF" でログインしている', null, { page }); 
      await And('バンドル管理画面を表示する', null, { page }); 
      await Then('バンドルカードが3件以上表示されている', null, { page }); 
    });

    test('Example #5', { tag: ['@F-03-04-001', '@F-03-04-004', '@F-03-04-007', '@UC-015', '@権限'] }, async ({ Given, Then, And, page }) => { 
      await Given('テスト用ユーザー "VIEWER" でログインしている', null, { page }); 
      await And('バンドル管理画面を表示する', null, { page }); 
      await Then('バンドルカードが3件以上表示されている', null, { page }); 
    });

  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, request }) => $runScenarioHooks('before', { request }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/F-03/F-03-04-001_bundle-list.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":15,"tags":["@F-03-04-001","@F-03-04-004","@F-03-04-007","@UC-015","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then バンドルカードが3件以上表示されている","stepMatchArguments":[{"group":{"start":8,"value":"3","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And バンドルカードがバンドル名の昇順で表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":20,"tags":["@F-03-04-001","@F-03-04-004","@F-03-04-007","@UC-015","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then バンドルカード「会議室セット」が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"会議室セット","children":[]}}]},{"pwStepLine":19,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And バンドルカード「会議室セット」に説明が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"会議室セット","children":[]}}]}]},
  {"pwTestLine":22,"pickleLine":25,"tags":["@F-03-04-001","@F-03-04-004","@F-03-04-007","@UC-015","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then バンドルカード「会議室セット」に構成製品チップが表示されている","stepMatchArguments":[{"group":{"start":8,"value":"会議室セット","children":[]}}]},{"pwStepLine":24,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"And 構成製品チップに「製品名 × 数量」形式で表示されている","stepMatchArguments":[]}]},
  {"pwTestLine":27,"pickleLine":30,"tags":["@F-03-04-001","@F-03-04-004","@F-03-04-007","@UC-015","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Then バンドルカード「会議室セット」に定価合計が打ち消し線付きで表示されている","stepMatchArguments":[{"group":{"start":8,"value":"会議室セット","children":[]}}]},{"pwStepLine":29,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"And バンドルカード「会議室セット」に割引率が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"会議室セット","children":[]}}]},{"pwStepLine":30,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"And バンドルカード「会議室セット」にバンドル価格が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"会議室セット","children":[]}}]}]},
  {"pwTestLine":33,"pickleLine":36,"tags":["@F-03-04-001","@F-03-04-004","@F-03-04-007","@UC-015","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Then バンドルカード「会議室セット」にステータスバッジ「有効」が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"会議室セット","children":[]}},{"group":{"start":25,"value":"有効","children":[]}}]}]},
  {"pwTestLine":37,"pickleLine":40,"tags":["@F-03-04-001","@F-03-04-004","@F-03-04-007","@UC-015","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"Given テスト用バンドル「TEST-BDL-INACTIVE」がINACTIVEステータスで作成されている","stepMatchArguments":[{"group":{"start":9,"value":"TEST-BDL-INACTIVE","children":[]}}]},{"pwStepLine":39,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"Then バンドルカード「TEST-BDL-INACTIVE」にステータスバッジ「無効」が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"TEST-BDL-INACTIVE","children":[]}},{"group":{"start":36,"value":"無効","children":[]}}]}]},
  {"pwTestLine":42,"pickleLine":45,"tags":["@F-03-04-001","@F-03-04-004","@F-03-04-007","@UC-015","@正常系"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":46,"keywordType":"Context","textWithKeyword":"Given テスト用バンドル「TEST-BDL-DRAFT」がDRAFTステータスで作成されている","stepMatchArguments":[{"group":{"start":9,"value":"TEST-BDL-DRAFT","children":[]}}]},{"pwStepLine":44,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"Then バンドルカード「TEST-BDL-DRAFT」にステータスバッジ「下書き」が表示されている","stepMatchArguments":[{"group":{"start":8,"value":"TEST-BDL-DRAFT","children":[]}},{"group":{"start":33,"value":"下書き","children":[]}}]}]},
  {"pwTestLine":49,"pickleLine":59,"tags":["@F-03-04-001","@F-03-04-004","@F-03-04-007","@UC-015","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":53,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":51,"gherkinStepLine":54,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then バンドルカードが3件以上表示されている","stepMatchArguments":[{"group":{"start":8,"value":"3","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":55,"pickleLine":60,"tags":["@F-03-04-001","@F-03-04-004","@F-03-04-007","@UC-015","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":53,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"MANAGER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"MANAGER\"","children":[{"start":10,"value":"MANAGER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":57,"gherkinStepLine":54,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then バンドルカードが3件以上表示されている","stepMatchArguments":[{"group":{"start":8,"value":"3","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":61,"pickleLine":61,"tags":["@F-03-04-001","@F-03-04-004","@F-03-04-007","@UC-015","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":53,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"BUYER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"BUYER\"","children":[{"start":10,"value":"BUYER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":63,"gherkinStepLine":54,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then バンドルカードが3件以上表示されている","stepMatchArguments":[{"group":{"start":8,"value":"3","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":67,"pickleLine":62,"tags":["@F-03-04-001","@F-03-04-004","@F-03-04-007","@UC-015","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":53,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"WAREHOUSE_STAFF\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"WAREHOUSE_STAFF\"","children":[{"start":10,"value":"WAREHOUSE_STAFF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":69,"gherkinStepLine":54,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then バンドルカードが3件以上表示されている","stepMatchArguments":[{"group":{"start":8,"value":"3","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":73,"pickleLine":63,"tags":["@F-03-04-001","@F-03-04-004","@F-03-04-007","@UC-015","@権限"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"ADMIN\" でログインしている","isBg":true,"stepMatchArguments":[{"group":{"start":9,"value":"\"ADMIN\"","children":[{"start":10,"value":"ADMIN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And テストデータが初期化されている","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","isBg":true,"stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":53,"keywordType":"Context","textWithKeyword":"Given テスト用ユーザー \"VIEWER\" でログインしている","stepMatchArguments":[{"group":{"start":9,"value":"\"VIEWER\"","children":[{"start":10,"value":"VIEWER","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":75,"gherkinStepLine":54,"keywordType":"Context","textWithKeyword":"And バンドル管理画面を表示する","stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then バンドルカードが3件以上表示されている","stepMatchArguments":[{"group":{"start":8,"value":"3","children":[]},"parameterTypeName":"int"}]}]},
]; // bdd-data-end