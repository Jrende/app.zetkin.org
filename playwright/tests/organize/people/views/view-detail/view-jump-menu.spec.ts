import { expect } from '@playwright/test';
import test from '../../../../../fixtures/next';

import AllMembers from '../../../../../mockData/orgs/KPD/people/views/AllMembers';
import AllMembersColumns from '../../../../../mockData/orgs/KPD/people/views/AllMembers/columns';
import AllMembersRows from '../../../../../mockData/orgs/KPD/people/views/AllMembers/rows';
import KPD from '../../../../../mockData/orgs/KPD';
import NewView from '../../../../../mockData/orgs/KPD/people/views/NewView';


test('View jump menu jumps between views', async ({ page, login, appUri, moxy }) => {
    await moxy.removeMock();
    await login();

    await moxy.setMock( '/orgs/1', 'get', {
        data: {
            data: KPD,
        },
    });

    const removeViewsMock = await moxy.setMock('/orgs/1/people/views', 'get', {
        data: {
            data: [ AllMembers, NewView ],
        },
        status: 200,
    });
    const removeViewMock = await moxy.setMock('/orgs/1/people/views/1', 'get', {
        data: {
            data: AllMembers,
        },
        status: 200,
    });
    const removeRowsMock = await moxy.setMock('/orgs/1/people/views/1/rows', 'get', {
        data: {
            data: AllMembersRows,
        },
        status: 200,
    });
    const removeColsMock = await moxy.setMock('/orgs/1/people/views/1/columns', 'get', {
        data: {
            data: AllMembersColumns,
        },
        status: 200,
    });

    await page.goto(appUri + '/organize/1/people/views/1');

    // Click to open the jump menu
    await page.click('data-testid=view-jump-menu-button');

    // Assert that the input is automatically focused, and type in part of the title of NewView
    expect(await page.locator('data-testid=view-jump-menu-popover >> input')).toBeFocused();
    await page.fill('data-testid=view-jump-menu-popover >> input', NewView.title.slice(0, 3));

    // Press down to select view and enter to navigate
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // Assert that we navigate away to the new view
    await page.waitForNavigation();
    await expect(page.url()).toEqual(appUri + `/organize/1/people/views/${NewView.id}`);

    await removeViewsMock();
    await removeViewMock();
    await removeRowsMock();
    await removeColsMock();

    await moxy.removeMock();
});
