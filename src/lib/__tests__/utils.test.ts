import { formatNaira, toKobo, toNaira, slugify } from '../utils';

describe('Utils', () => {
  describe('formatNaira', () => {
    it('should format kobo to Naira with symbol', () => {
      expect(formatNaira(100000)).toBe('₦1,000');
      expect(formatNaira(50000)).toBe('₦500');
      expect(formatNaira(12345)).toBe('₦123');
    });

    it('should handle zero', () => {
      expect(formatNaira(0)).toBe('₦0');
    });

    it('should handle large amounts', () => {
      expect(formatNaira(10000000)).toBe('₦100,000');
      expect(formatNaira(123456789)).toBe('₦1,234,568');
    });

    it('should handle single kobo', () => {
      expect(formatNaira(1)).toBe('₦0');
      expect(formatNaira(99)).toBe('₦1');
    });

    it('should round to nearest naira', () => {
      expect(formatNaira(12345)).toBe('₦123');
      expect(formatNaira(12350)).toBe('₦124');
    });
  });

  describe('toKobo', () => {
    it('should convert Naira to kobo', () => {
      expect(toKobo(1000)).toBe(100000);
      expect(toKobo(500)).toBe(50000);
      expect(toKobo(123.45)).toBe(12345);
    });

    it('should handle zero', () => {
      expect(toKobo(0)).toBe(0);
    });

    it('should handle decimal amounts', () => {
      expect(toKobo(10.5)).toBe(1050);
      expect(toKobo(0.99)).toBe(99);
      expect(toKobo(0.01)).toBe(1);
    });

    it('should handle large amounts', () => {
      expect(toKobo(1000000)).toBe(100000000);
    });

    it('should round to nearest kobo', () => {
      expect(toKobo(10.555)).toBe(1056); // Rounds up
      expect(toKobo(10.554)).toBe(1055); // Rounds down
    });
  });

  describe('toNaira', () => {
    it('should convert kobo to Naira', () => {
      expect(toNaira(100000)).toBe(1000);
      expect(toNaira(50000)).toBe(500);
      expect(toNaira(12345)).toBe(123.45);
    });

    it('should handle zero', () => {
      expect(toNaira(0)).toBe(0);
    });

    it('should handle single kobo', () => {
      expect(toNaira(1)).toBe(0.01);
      expect(toNaira(99)).toBe(0.99);
    });

    it('should handle large amounts', () => {
      expect(toNaira(100000000)).toBe(1000000);
    });

    it('should produce correct decimal values', () => {
      expect(toNaira(1050)).toBe(10.5);
      expect(toNaira(12350)).toBe(123.5);
    });
  });

  describe('slugify', () => {
    it('should convert string to lowercase slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
      expect(slugify('GREAT DELIGHT')).toBe('great-delight');
    });

    it('should replace spaces with hyphens', () => {
      expect(slugify('Multiple   Spaces')).toBe('multiple-spaces');
      expect(slugify('  Leading and trailing  ')).toBe('leading-and-trailing');
    });

    it('should remove special characters', () => {
      expect(slugify('Hello@World!')).toBe('helloworld');
      expect(slugify('Test#123$')).toBe('test123');
    });

    it('should handle mixed cases', () => {
      expect(slugify('CamelCaseString')).toBe('camelcasestring');
      expect(slugify('PascalCaseString')).toBe('pascalcasestring');
    });

    it('should handle numbers', () => {
      expect(slugify('Table 01')).toBe('table-01');
      expect(slugify('Room 123')).toBe('room-123');
    });

    it('should handle empty string', () => {
      expect(slugify('')).toBe('');
    });

    it('should handle already slugified strings', () => {
      expect(slugify('already-a-slug')).toBe('already-a-slug');
    });

    it('should remove consecutive hyphens', () => {
      expect(slugify('Too  ---  Many  ---  Hyphens')).toBe('too-many-hyphens');
    });

    it('should handle Nigerian restaurant names', () => {
      expect(slugify('GREAT DELIGHT Restaurant')).toBe('great-delight-restaurant');
      expect(slugify("Mama's Kitchen")).toBe('mamas-kitchen');
      expect(slugify('Jollof & Rice')).toBe('jollof-rice');
    });
  });

  describe('Integration: formatNaira + toKobo', () => {
    it('should be reversible for display purposes', () => {
      const naira = 1500;
      const kobo = toKobo(naira);
      const formatted = formatNaira(kobo);
      expect(formatted).toBe('₦1,500');
    });

    it('should maintain precision with toNaira', () => {
      const amounts = [100, 250.50, 999.99, 0.01, 10000];
      amounts.forEach((amount) => {
        const kobo = toKobo(amount);
        const back = toNaira(kobo);
        expect(back).toBe(amount);
      });
    });
  });
});
