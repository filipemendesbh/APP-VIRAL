// Story text for "The Christmas Spirit Missions".
// {NAME} is replaced by the personalised name (or a generic fallback).

const intro = {
  title: 'A Letter from the North Pole',
  greeting: 'Dear {NAME},',
  paragraphs: [
    'Ho-ho-hello! My name is <b>Pip</b>, and I am one of Santa’s elves at the North Pole. I have BIG news…',
    'Santa’s sleigh doesn’t fly on fuel. It flies on <b>Christmas Spirit</b>! This year the Spirit Meter is running very low, and Santa needs a special helper. That’s <b>YOU</b>!',
    'Inside this book are <b>12 secret missions</b>. Do each one with someone you love, take a photo, and stick it on the page. Every mission you finish lights up one star on the Spirit Meter.',
    'Fill all 12 stars before Christmas Eve, and Santa’s sleigh will fly brighter than ever!',
  ],
  signoff: 'With jingle-bell hugs,',
  signature: 'Pip the Elf',
  ps: 'P.S. Your first clue is waiting on the next page…',
};

const missions = [
  {
    key: 'letter',
    title: 'Write a Letter to Santa',
    poem: [
      'Grab a pencil, crayons too,',
      'Santa wants to hear from you!',
      'Tell him what makes your heart feel bright,',
      'and all the kind things you did right.',
      'Fold it neatly, seal it tight,',
      'the North Pole mail flies out tonight!',
    ],
    clue: 'To find your house, Santa needs a sign… something tall and green, all set to shine!',
  },
  {
    key: 'tree',
    title: 'Decorate the Christmas Tree',
    poem: [
      'Untangle the lights and hang them low,',
      'then watch the branches start to glow!',
      'Ornaments red and baubles of gold,',
      'old favorites with stories told.',
      'The very last touch? Reach up high,',
      'a shining star to greet the sky!',
    ],
    clue: 'Your tree looks merry, bright and new… but it’s missing something made by YOU!',
  },
  {
    key: 'ornament',
    title: 'Make a Handmade Ornament',
    poem: [
      'Paper, glitter, glue and string,',
      'you can make most anything!',
      'A snowflake, a reindeer, a star or a heart,',
      'every ornament is a work of art.',
      'Write the year on the back with care,',
      'next Christmas it will still be there!',
    ],
    clue: 'Your tree is twinkling, warm and bright… now let’s go see the town’s lights tonight!',
  },
  {
    key: 'lights',
    title: 'Go See the Christmas Lights',
    poem: [
      'Bundle up and grab a seat,',
      'we’re cruising slowly down the street!',
      'Rooftops twinkle, reindeer glow,',
      'candy canes lined in a row.',
      'Count the colors, one, two, three…',
      'which house is the best? You decide with me!',
    ],
    clue: 'All that glitter, all that light… now let’s make something fluffy and white!',
  },
  {
    key: 'snowman',
    title: 'Build a Snowman',
    poem: [
      'Roll a snowball, big and round,',
      'roll it, roll it on the ground!',
      'Stack them up, one, two, three,',
      'a carrot nose, a smile with glee.',
      'No snow outside? That’s fine, my friend,',
      'cut paper snowflakes, end to end!',
    ],
    clue: 'Brrr! Your cheeks are cold and pink… it’s time for a cozy chocolate drink!',
  },
  {
    key: 'cocoa',
    title: 'Hot Cocoa & a Christmas Movie',
    poem: [
      'Put on pajamas, soft and snug,',
      'pour hot cocoa in a mug.',
      'Marshmallows, one or ten,',
      'grab a blanket, snuggle in.',
      'Press play on a Christmas show,',
      'popcorn ready? Here we go!',
    ],
    clue: 'Feeling sweet? Here’s something neat: build a little house that you can EAT!',
  },
  {
    key: 'gingerbread',
    title: 'Build a Gingerbread House',
    poem: [
      'Gingerbread walls and a frosting door,',
      'gumdrops lined across the floor.',
      'Candy canes and sprinkle snow,',
      'peppermint windows all aglow.',
      'If a wall falls down, don’t fret!',
      'Just eat it up, the best part yet!',
    ],
    clue: 'Your house is sweet, but here’s the thing: the sweetest gift is the kindness you bring!',
  },
  {
    key: 'kindness',
    title: 'Do a Kindness Mission',
    poem: [
      'Christmas magic grows the most',
      'when we share from coast to coast.',
      'Give a toy or bake a treat,',
      'help a neighbor down the street.',
      'Draw a card or hold a door,',
      'kindness makes the sleigh fly more!',
    ],
    clue: 'Your kind heart is shining strong… now let’s fill the air with SONG!',
  },
  {
    key: 'carols',
    title: 'Sing Christmas Carols',
    poem: [
      'Jingle Bells and Silent Night,',
      'sing out loud with all your might!',
      'Sing to Grandma on the phone,',
      'sing to the dog, or sing alone.',
      'Off-key is perfectly okay,',
      'the elves sing that way every day!',
    ],
    clue: 'Your song was merry, loud and clear… now wrap some gifts for those you hold dear!',
  },
  {
    key: 'wrap',
    title: 'Wrap the Presents',
    poem: [
      'Paper, ribbons, tape and bows,',
      'how much tape? Nobody knows!',
      'Fold the corners, wrap it tight,',
      'add a tag and write it right.',
      'Shhh… keep the secret, don’t you tell',
      'what’s inside, it’s wrapped so well!',
    ],
    clue: 'The gifts are wrapped beneath the tree… but Santa needs a snack, you see!',
  },
  {
    key: 'cookies',
    title: 'Bake Christmas Cookies',
    poem: [
      'Sugar, butter, flour too,',
      'stir it up, it’s time for you!',
      'Roll the dough and cut the shapes:',
      'stars and trees and snowflake capes.',
      'Frost them, sprinkle, taste a few…',
      'but save some, Santa wants one too!',
    ],
    clue: 'Your cookies smell like Christmas cheer… and tonight a VERY special guest is near!',
  },
  {
    key: 'eve',
    title: 'Christmas Eve Treats for Santa',
    poem: [
      'Milk and cookies on a plate,',
      'Santa’s coming, don’t stay up late!',
      'Sprinkle oats and glitter bright,',
      'reindeer food to guide their flight.',
      'Hang your stocking, close your eyes…',
      'tomorrow brings a big surprise!',
    ],
    clue: 'Shhh… the very last star is glowing. Turn the page when the morning sun is showing!',
  },
];

const ending = {
  title: 'You Did It!',
  poem: [
    'All twelve stars are shining bright,',
    'the Spirit Meter’s full tonight!',
    'Santa’s sleigh zoomed through the sky,',
    'the brightest sleigh that ever flew by.',
    'And Santa smiled and said with cheer:',
    '“Thank you, {NAME}! See you next year!”',
  ],
  certTitle: 'Official Christmas Spirit Helper',
};

const memories = {
  title: 'My Christmas Memories',
  prompts: [
    'My favorite mission was…',
    'The funniest moment was…',
    'This Christmas I am thankful for…',
    'Next Christmas I want to…',
  ],
  closing: 'See you next Christmas!',
};

module.exports = { intro, missions, ending, memories };
