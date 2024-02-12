const { test, expect } = require("@playwright/test");
const { login, pass } = require("../user.js");

test("Успешная авторизация", async ({ page }) => {  
  await page.goto("https://netology.ru");
  await page.screenshot({path: `./screenshot/screenshot-success1.png`});
  await page.click('text=Войти');
  await page.screenshot({path: `./screenshot/screenshot-success2.png`});
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', login);
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', pass);  
  await page.click('[data-testid="login-submit-btn"]');
  await page.screenshot({path: `./screenshot/screenshot-success3.png`});
  await expect(page.getByRole('heading', { name: 'Моё обучение' })).toBeVisible();  
});

test("Неуспешная авторизация", async ({ page }) => {  
  await page.goto("https://netology.ru");
  await page.screenshot({path: `./screenshot/screenshot-unsuccess1.png`});
  
  await page.click('text=Войти');
  await page.screenshot({path: `./screenshot/screenshot-unsuccess2.png`});
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', 'login123@mail.ru');
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', "pass010");  
  await page.click('[data-testid="login-submit-btn"]');
  await page.screenshot({path: `./screenshot/screenshot-unsuccess3.png`});
  await expect(page.locator('[data-testid="login-error-hint"]')).toContainText("Вы ввели неправильно логин или пароль")
});



/*
await expect(page.locator('[data-testid="login-error-hint"]')).toBeVisible;  
  const page = await browser.newPage();
  await page.goto("https://netology.ru");
  await page.click('text=Войти');
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', 'gala6858@mail.ru');
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', 'Lazo-1710');
  await page.pause();
  await page.click('[data-testid="login-submit-btn"]')

  await expect(page.getByTestId('profile-programs-content')).toHaveText('Моё обучение');
  //assertion
  await browser.close();
  page.getByRole('heading', { name: 'Моё обучение' })
      await page.screenshot({path: `screenshot-${browserType.name()}.png`});
*/