import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper: Convert Naira to kobo (minor units)
const toKobo = (naira: number): number => naira * 100;

async function main() {
  console.log('🌱 Adding new menu items...\n');

  // Get the main branch
  const branch = await prisma.branch.findFirst({
    where: { slug: 'main' },
  });

  if (!branch) {
    throw new Error('Main branch not found!');
  }

  // ============================================
  // 1. ADD NEW CATEGORIES
  // ============================================
  console.log('Creating new categories...');

  const drinksCategory = await prisma.menuCategory.upsert({
    where: { branchId_slug: { branchId: branch.id, slug: 'drinks' } },
    update: { active: true },
    create: {
      branchId: branch.id,
      name: 'Drinks',
      slug: 'drinks',
      description: 'Beers, wines, and beverages',
      active: true,
      sortOrder: 6,
    },
  });

  const grillsCategory = await prisma.menuCategory.upsert({
    where: { branchId_slug: { branchId: branch.id, slug: 'grills' } },
    update: { active: true },
    create: {
      branchId: branch.id,
      name: 'Grills',
      slug: 'grills',
      description: 'Grilled meats and BBQ specialties',
      active: true,
      sortOrder: 7,
    },
  });

  const cocktailsCategory = await prisma.menuCategory.upsert({
    where: { branchId_slug: { branchId: branch.id, slug: 'cocktails' } },
    update: { active: true },
    create: {
      branchId: branch.id,
      name: 'Cocktails',
      slug: 'cocktails',
      description: 'Signature alcoholic cocktails',
      active: true,
      sortOrder: 8,
    },
  });

  const mocktailsCategory = await prisma.menuCategory.upsert({
    where: { branchId_slug: { branchId: branch.id, slug: 'mocktails' } },
    update: { active: true },
    create: {
      branchId: branch.id,
      name: 'Mocktails',
      slug: 'mocktails',
      description: 'Non-alcoholic refreshing drinks',
      active: true,
      sortOrder: 9,
    },
  });

  const teasCategory = await prisma.menuCategory.upsert({
    where: { branchId_slug: { branchId: branch.id, slug: 'teas' } },
    update: { active: true },
    create: {
      branchId: branch.id,
      name: 'Teas',
      slug: 'teas',
      description: 'Hot and cold tea selections',
      active: true,
      sortOrder: 10,
    },
  });

  console.log('✓ Categories created/updated\n');

  // ============================================
  // 2. ADD DRINKS - BEERS
  // ============================================
  console.log('Adding beers...');

  const beers = [
    { name: 'Star Lager', slug: 'star-lager', description: 'Premium Nigerian lager beer', price: 2500 },
    { name: 'Heineken', slug: 'heineken', description: 'International premium lager', price: 2500 },
    { name: 'Gulder', slug: 'gulder', description: 'Ultimate lager beer', price: 2500 },
    { name: 'Trophy', slug: 'trophy', description: 'Extra special stout', price: 2000 },
    { name: 'Life Continental', slug: 'life-continental', description: 'Light and refreshing lager', price: 2000 },
  ];

  for (const beer of beers) {
    await prisma.menuItem.upsert({
      where: {
        categoryId_slug: {
          categoryId: drinksCategory.id,
          slug: beer.slug,
        },
      },
      update: { available: true, active: true },
      create: {
        categoryId: drinksCategory.id,
        name: beer.name,
        slug: beer.slug,
        description: beer.description,
        basePrice: toKobo(beer.price),
        active: true,
        available: true,
      },
    });
  }

  console.log('✓ Added 5 beers');

  // ============================================
  // 3. ADD DRINKS - WINES
  // ============================================
  console.log('Adding wines...');

  const wines = [
    { name: 'Four Cousins', slug: 'four-cousins', description: 'Fruity sweet wine', price: 3500 },
    { name: 'Baron Romero', slug: 'baron-romero', description: 'Spanish red wine', price: 4000 },
    { name: 'Eva Wine', slug: 'eva-wine', description: 'Sweet sparkling wine', price: 2500 },
  ];

  for (const wine of wines) {
    await prisma.menuItem.upsert({
      where: {
        categoryId_slug: {
          categoryId: drinksCategory.id,
          slug: wine.slug,
        },
      },
      update: { available: true, active: true },
      create: {
        categoryId: drinksCategory.id,
        name: wine.name,
        slug: wine.slug,
        description: wine.description,
        basePrice: toKobo(wine.price),
        active: true,
        available: true,
      },
    });
  }

  // Carlo Rossi wines with variants
  const carloRossiRed = await prisma.menuItem.upsert({
    where: {
      categoryId_slug: {
        categoryId: drinksCategory.id,
        slug: 'carlo-rossi-red',
      },
    },
    update: { available: true, active: true },
    create: {
      categoryId: drinksCategory.id,
      name: 'Carlo Rossi Red',
      slug: 'carlo-rossi-red',
      description: 'Sweet red wine',
      active: true,
      available: true,
    },
  });

  // Add variants for Carlo Rossi Red (delete existing first to avoid duplicates)
  await prisma.menuVariant.deleteMany({
    where: { menuItemId: carloRossiRed.id },
  });

  await prisma.menuVariant.createMany({
    data: [
      {
        menuItemId: carloRossiRed.id,
        name: 'Small (Glass)',
        price: toKobo(1500),
        available: true,
        sortOrder: 1,
      },
      {
        menuItemId: carloRossiRed.id,
        name: 'Large (Bottle)',
        price: toKobo(4000),
        available: true,
        sortOrder: 2,
      },
    ],
  });

  const carloRossiWhite = await prisma.menuItem.upsert({
    where: {
      categoryId_slug: {
        categoryId: drinksCategory.id,
        slug: 'carlo-rossi-white',
      },
    },
    update: { available: true, active: true },
    create: {
      categoryId: drinksCategory.id,
      name: 'Carlo Rossi White',
      slug: 'carlo-rossi-white',
      description: 'Crisp white wine',
      active: true,
      available: true,
    },
  });

  // Add variants for Carlo Rossi White (delete existing first to avoid duplicates)
  await prisma.menuVariant.deleteMany({
    where: { menuItemId: carloRossiWhite.id },
  });

  await prisma.menuVariant.createMany({
    data: [
      {
        menuItemId: carloRossiWhite.id,
        name: 'Small (Glass)',
        price: toKobo(1500),
        available: true,
        sortOrder: 1,
      },
      {
        menuItemId: carloRossiWhite.id,
        name: 'Large (Bottle)',
        price: toKobo(4000),
        available: true,
        sortOrder: 2,
      },
    ],
  });

  console.log('✓ Added 5 wines');

  // ============================================
  // 4. ADD GRILLS
  // ============================================
  console.log('Adding grills...');

  const grills = [
    { name: 'Grilled Whole Chicken', slug: 'grilled-whole-chicken', description: 'Perfectly grilled whole chicken', price: 8000 },
    { name: 'BBQ Ribs', slug: 'bbq-ribs', description: 'Tender BBQ pork ribs', price: 6500 },
    { name: 'Grilled Fish', slug: 'grilled-fish', description: 'Fresh grilled tilapia or catfish', price: 5000 },
    { name: 'Suya Platter', slug: 'suya-platter', description: 'Spicy grilled beef suya', price: 4000 },
    { name: 'Mixed Grill Platter', slug: 'mixed-grill-platter', description: 'Chicken, beef, and sausage', price: 12000 },
    { name: 'Grilled Prawns', slug: 'grilled-prawns', description: 'Jumbo prawns with garlic butter', price: 7500 },
    { name: 'Asun (Spicy Goat Meat)', slug: 'asun', description: 'Spicy grilled goat meat', price: 5500 },
  ];

  for (const grill of grills) {
    await prisma.menuItem.upsert({
      where: {
        categoryId_slug: {
          categoryId: grillsCategory.id,
          slug: grill.slug,
        },
      },
      update: { available: true, active: true },
      create: {
        categoryId: grillsCategory.id,
        name: grill.name,
        slug: grill.slug,
        description: grill.description,
        basePrice: toKobo(grill.price),
        active: true,
        available: true,
      },
    });
  }

  console.log('✓ Added 7 grills');

  // ============================================
  // 5. ADD COCKTAILS
  // ============================================
  console.log('Adding cocktails...');

  const cocktails = [
    { name: 'Chapman', slug: 'chapman-cocktail', description: 'Classic Nigerian cocktail mix', price: 2500 },
    { name: 'Pina Colada', slug: 'pina-colada', description: 'Rum, coconut cream, and pineapple', price: 3500 },
    { name: 'Mojito', slug: 'mojito', description: 'Rum, mint, lime, and soda', price: 3000 },
    { name: 'Sex on the Beach', slug: 'sex-on-the-beach', description: 'Vodka, peach schnapps, and fruit juices', price: 3500 },
    { name: 'Mai Tai', slug: 'mai-tai', description: 'Rum and tropical fruit blend', price: 3500 },
    { name: 'Margarita', slug: 'margarita', description: 'Tequila, lime, and triple sec', price: 3500 },
  ];

  for (const cocktail of cocktails) {
    await prisma.menuItem.upsert({
      where: {
        categoryId_slug: {
          categoryId: cocktailsCategory.id,
          slug: cocktail.slug,
        },
      },
      update: { available: true, active: true },
      create: {
        categoryId: cocktailsCategory.id,
        name: cocktail.name,
        slug: cocktail.slug,
        description: cocktail.description,
        basePrice: toKobo(cocktail.price),
        active: true,
        available: true,
      },
    });
  }

  console.log('✓ Added 6 cocktails');

  // ============================================
  // 6. ADD MOCKTAILS
  // ============================================
  console.log('Adding mocktails...');

  const mocktails = [
    { name: 'Virgin Mojito', slug: 'virgin-mojito', description: 'Refreshing mint and lime mocktail', price: 2000 },
    { name: 'Fruit Punch', slug: 'fruit-punch', description: 'Mixed tropical fruit blend', price: 1800 },
    { name: 'Fresh Squeeze', slug: 'fresh-squeeze', description: 'Fresh orange or pineapple juice', price: 2500 },
    { name: 'Berry Blast', slug: 'berry-blast', description: 'Mixed berries smoothie', price: 2200 },
    { name: 'Tropical Paradise', slug: 'tropical-paradise', description: 'Mango, passion fruit, and coconut', price: 2500 },
  ];

  for (const mocktail of mocktails) {
    await prisma.menuItem.upsert({
      where: {
        categoryId_slug: {
          categoryId: mocktailsCategory.id,
          slug: mocktail.slug,
        },
      },
      update: { available: true, active: true },
      create: {
        categoryId: mocktailsCategory.id,
        name: mocktail.name,
        slug: mocktail.slug,
        description: mocktail.description,
        basePrice: toKobo(mocktail.price),
        active: true,
        available: true,
      },
    });
  }

  console.log('✓ Added 5 mocktails');

  // ============================================
  // 7. ADD TEAS
  // ============================================
  console.log('Adding teas...');

  const teas = [
    { name: 'Lipton Hot Tea', slug: 'lipton-hot-tea', description: 'Classic hot tea', price: 500 },
    { name: 'Green Tea', slug: 'green-tea', description: 'Antioxidant-rich green tea', price: 800 },
    { name: 'Herbal Tea', slug: 'herbal-tea', description: 'Soothing herbal infusion', price: 1000 },
    { name: 'Iced Tea', slug: 'iced-tea', description: 'Refreshing cold brewed tea', price: 1200 },
  ];

  for (const tea of teas) {
    await prisma.menuItem.upsert({
      where: {
        categoryId_slug: {
          categoryId: teasCategory.id,
          slug: tea.slug,
        },
      },
      update: { available: true, active: true },
      create: {
        categoryId: teasCategory.id,
        name: tea.name,
        slug: tea.slug,
        description: tea.description,
        basePrice: toKobo(tea.price),
        active: true,
        available: true,
      },
    });
  }

  console.log('✓ Added 4 teas');

  console.log('\n✅ All new menu items added successfully!\n');
  console.log('Summary:');
  console.log('- 5 Beers');
  console.log('- 5 Wines (including Carlo Rossi variants)');
  console.log('- 7 Grills');
  console.log('- 6 Cocktails');
  console.log('- 5 Mocktails');
  console.log('- 4 Teas');
  console.log('\nTotal: 32 new items + 5 new categories');
}

main()
  .catch((e) => {
    console.error('❌ Error adding new items:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
