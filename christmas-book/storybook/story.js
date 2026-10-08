// "Oliver's Christmas Missions": story text and illustration brief, one entry per spread.
// {NAME} is replaced by the child's name and rendered in red, as in the reference spread.
// Each spread ends with "★ One more star on the list." plus a teaser that leads to the next mission.

const CHARACTERS = `Characters must look exactly like the character reference sheets.
OLIVER: 5-year-old boy, short wavy brown hair, brown eyes, rosy cheeks, cream knit sweater with a red Fair Isle band of reindeer, Christmas trees and snowflakes, grey jeans rolled at the ankle, brown lace-up boots. Outdoors he adds a navy puffer coat (open, sweater visible) and a red knit hat.
BISCUIT: tri-color beagle puppy (tan, black saddle, white chest, white paws, white tail tip), long brown floppy ears.
PIP: a tiny elf about the size of a teddy bear, pointed ears, green knit hat with a dark red pompom, chunky dark red knit scarf, cream cable-knit sweater with green belt and gold buckle, green leggings, brown boots. Pip is small and partly hidden somewhere in the scene (seek-and-find).`;

const STYLE = `Wide panoramic children's picture book double-page spread (2:1), soft warm painterly storybook illustration in exactly the same style as the style reference image: gentle gouache and colored-pencil texture, warm cream palette, soft cozy lighting.`;

const LAYOUT = `Keep all characters and main objects in the lower half of the image and away from the exact vertical center line (the book gutter). The upper-left quarter must be calm, empty background (plain wall or sky) for text, and the upper-right quarter must be calm, empty background for a photo frame. No text, letters or words anywhere in the image.`;

const intro = {
  file: 'spread-00-intro',
  title: 'The Box on the Doorstep',
  text: [
    'On the first morning of December, Biscuit barked at the front door. On the mat sat a box tied with red ribbon and a tag shaped like a star.',
    'Inside was a tiny letter: <i>“Dear {NAME}, Santa’s sleigh runs on Christmas Spirit, and this year it is running low. Please help! Finish twelve missions before Christmas Eve and every one will add a star to your list. Love, Pip the Elf.”</i>',
  ],
  star: 'Pip hides in every picture. Can you find him?',
  teaser: 'And under the letter, something green and round was waiting…',
  scene: `the front porch and open front door of a cozy American house on a snowy December morning; Oliver kneels on the doormat opening a brown cardboard box tied with a red ribbon and a gold star-shaped tag; golden light glows out of the box; Biscuit sniffs the box excitedly; Pip peeks from behind a potted pine tree beside the door.`,
};

const missions = [
  {
    title: 'Deck the House',
    list: 'Deck the house',
    text: 'Inside the box was a wreath with a big red bow, and it belonged on the front door. {NAME} hung it a little crooked, which made it just right. A paper snowflake for the window, a snow globe for the shelf. Biscuit tried to wear the bow.',
    teaser: 'And on the hall table, paper and crayons were waiting…',
    scene: `cozy front hallway with cream striped wallpaper, white wainscoting and warm wood floor; Oliver stands on tiptoe hanging a green wreath with a big red bow on a red front door; Biscuit sits nearby wearing the red bow on his head; a paper snowflake on the side window; a hall table on the right with a snow globe, paper and crayons; Pip hides behind the snow globe.`,
  },
  {
    title: 'Dear Santa',
    list: 'Write a letter to Santa',
    text: '{NAME} drew a big tree, a red sled and Biscuit in a Santa hat. Then came the hardest part: deciding what to wish for. In the end the list said <i>a sled, a book about dinosaurs, and a happy Christmas for everybody.</i> Biscuit signed it with a paw print.',
    teaser: 'That night, the smell of pine came drifting through the door…',
    scene: `cozy kitchen table by a frosty window; Oliver sits at the table drawing a colorful letter to Santa with crayons, an envelope with a red stamp beside him; Biscuit rests his chin on the table with one paw covered in red paint; a red mailbox with its flag up is visible through the window; Pip peeks out of a mug of crayons.`,
  },
  {
    title: 'The Perfect Tree',
    list: 'Decorate the Christmas tree',
    text: 'There it stood, tall and green, in the corner of the living room. First the lights, round and round. Then the ornaments, one by one, each with its own story. {NAME} was lifted up high to put the star on top. Biscuit guarded the tinsel, mostly by sitting in it.',
    teaser: 'But one branch, right in the front, was still empty…',
    scene: `cozy living room with cream striped wallpaper and white wainscoting; a big Christmas tree with warm white lights and red and gold ornaments in the left-center; Oliver is lifted up by a parent's arms (only the arms visible) to place a golden star on top; Biscuit sits inside an open box of tinsel; fireplace with stockings on the right; Pip hangs from a branch like an ornament.`,
  },
  {
    title: 'Made by Me',
    list: 'Make a handmade ornament',
    text: 'Some ornaments come from a store. The best ones are made at the kitchen table. With paper, glue, glitter and a lot of concentration, {NAME} made a star for the empty branch and wrote the year on the back. There was glitter everywhere. There was glitter on Biscuit for a week.',
    teaser: 'When it got dark, the houses down the street began to twinkle…',
    scene: `kitchen table craft time; Oliver proudly holds up a handmade paper star ornament covered in gold glitter, with glue, scissors, colored paper and string on the table; Biscuit sits on a chair with sparkly glitter on his nose and ears; the decorated tree is visible on the far right with one empty branch; Pip sits on a spool of red ribbon.`,
  },
  {
    title: 'Lights on Our Street',
    list: 'Go see the Christmas lights',
    text: 'Bundled up in coats and scarves, everyone went out to see the lights. One house had a giant snowman. One had reindeer on the roof. One blinked in time to music! {NAME} gave every house a score out of ten, and Biscuit barked at an inflatable penguin.',
    teaser: 'And while everyone slept, the sky began to drop something soft and white…',
    scene: `evening street of houses glowing with colorful Christmas lights, deep blue twilight sky with first stars; Oliver in his navy coat and red hat walks on the snowy sidewalk holding a parent's hand (only hand visible), pointing at a house with lit reindeer on the roof; Biscuit in a little red sweater barks at an inflatable penguin on a lawn; Pip sits on a lamppost. The upper corners are calm dark-blue sky.`,
  },
  {
    title: 'Snow Day!',
    list: 'Build a snowman',
    text: 'The whole yard was white! {NAME} rolled a little snowball into a big one, and a big one into a bigger one. A carrot nose, two buttons, a red scarf. Biscuit chased every snowball and caught none of them. <i>(No snow where you live? Paper snowflakes count too!)</i>',
    teaser: 'Cold noses and pink cheeks could only mean one thing…',
    scene: `bright snowy backyard with pine trees and a wooden fence; Oliver in his navy coat and red hat puts a carrot nose on a finished snowman wearing a red scarf; Biscuit leaps after a flying snowball, snow on his ears; Pip peeks out from behind the snowman. The upper corners are calm pale winter sky.`,
  },
  {
    title: 'Cocoa and a Movie',
    list: 'Hot cocoa and a Christmas movie',
    text: 'Pajamas on. Blankets on the couch. Hot cocoa in the big mugs, with marshmallows floating like little clouds. Everyone squeezed together for a Christmas movie, and Biscuit got the best spot, right in the middle.',
    teaser: 'In the movie there was a little house made of gingerbread, and {NAME} had an idea…',
    scene: `cozy living room at night lit by the glowing tree; Oliver in red plaid pajamas sits on a soft couch under a knitted blanket holding a big mug of hot cocoa with marshmallows; Biscuit curled up beside him; a bowl of popcorn; the warm glow of a TV screen at the edge; Pip peeks out of the popcorn bowl. Keep Oliver's face and hair exactly like the reference.`,
  },
  {
    title: 'The Gingerbread House',
    list: 'Build a gingerbread house',
    text: 'Walls of gingerbread, a roof of icing snow, candy-cane posts and gumdrop windows. The walls fell down twice. The third time, they stayed! {NAME} ate one gumdrop for every gumdrop on the roof, which seemed fair.',
    teaser: 'Stuck in the frosting was a note from Pip: “The sweetest gift is kindness…”',
    scene: `kitchen counter covered in candies, icing bags and sprinkles; Oliver carefully adds a gumdrop to the roof of a gingerbread house with icing snow; Biscuit sits below hoping for crumbs; Pip hides behind the gingerbread house holding a tiny candy cane.`,
  },
  {
    title: 'A Kind Heart',
    list: 'Do something kind',
    text: '{NAME} chose a toy to give to a child who needed one, and carried a plate of cookies next door. Mrs. Rose smiled so big that her glasses slid down her nose. Kindness, it turns out, makes you feel warm all over, even in December.',
    teaser: 'On the way home, a song came floating down the street…',
    scene: `snowy front step of a neighbor's house with a green door; Oliver in his navy coat hands a plate of cookies wrapped in red ribbon to a smiling elderly neighbor with glasses; a box of donated toys sits beside him; Biscuit wags his tail; Pip peeks from a wreath on the neighbor's door. The upper corners are calm pale winter sky or wall.`,
  },
  {
    title: 'Sing Along',
    list: 'Sing Christmas carols',
    text: '<i>Jingle Bells</i>, <i>Silent Night</i> and <i>Rudolph the Red-Nosed Reindeer</i>. {NAME} sang loud. {NAME} sang soft. {NAME} sang for Grandma on the phone. Biscuit howled along on every chorus, a little off-key, but full of Christmas Spirit.',
    teaser: 'Meanwhile, under the bed, a pile of presents was waiting to be wrapped…',
    scene: `living room by the glowing Christmas tree; Oliver sings with his mouth wide open, holding a little song book; Biscuit howls with his nose in the air; a tablet propped on the piano shows a smiling grandmother (no text on screen); little music notes floating; Pip plays a tiny bell on top of the piano.`,
  },
  {
    title: 'It’s a Wrap',
    list: 'Wrap the presents',
    text: 'Paper with snowmen, paper with stars and far too much tape. {NAME} folded the corners, tied the ribbons and wrote every tag very carefully. One present looked a lot like a bone. Biscuit was very interested in that one.',
    teaser: 'Christmas Eve was almost here, and Santa would surely be hungry…',
    scene: `bedroom floor covered with rolls of wrapping paper, ribbons and tape; Oliver ties a big red bow on a present; Biscuit sniffs a bone-shaped present; a pile of wrapped gifts; Pip is half-wrapped inside a sheet of paper, peeking out.`,
  },
  {
    title: 'Cookies for Santa',
    list: 'Cookies and milk for Santa',
    text: '{NAME} baked star cookies, poured a glass of milk and sprinkled reindeer food on the snow outside. Stockings were hung and pajamas were on. The house was quiet. Biscuit kept one ear open, just in case.',
    teaser: 'Then, very late, there was a faint jingle on the roof…',
    scene: `Christmas Eve night by the fireplace; Oliver in red plaid pajamas places a plate of star cookies and a glass of milk on a little table next to the fireplace with hung stockings; a carrot for the reindeer; Biscuit lies on the rug with one ear up; moonlit snowy window; Pip sits inside a stocking, peeking out.`,
  },
];

const ending = {
  file: 'spread-13-christmas-morning',
  title: 'Christmas Morning',
  text: [
    'In the morning there were sleigh tracks in the snow, crumbs on the plate and a note on the tree:',
    '<i>“Thank you, {NAME}! Santa’s sleigh flew brighter than ever. You are an Official Christmas Spirit Helper. See you next year! Love, Pip.”</i>',
  ],
  star: 'Twelve stars on the list. Mission complete!',
  scene: `Christmas morning in the living room with sunlight through the window; Oliver in red plaid pajamas jumps with joy in front of the tree surrounded by unwrapped presents and a red sled; Biscuit plays with a ribbon; empty cookie plate with crumbs; a tiny note hangs on the tree; through the window, sleigh tracks in the snow; Pip waves goodbye from the windowsill.`,
};

const cover = {
  file: 'cover',
  scene: `Square children's picture book cover in the same painterly style: Oliver, Biscuit and Pip stand together in the snow in front of a glowing Christmas tree and a cozy house at dusk, Oliver holding a gold star; gentle falling snow. Keep the top 35% of the image as calm sky for the title. No text.`,
};

missions.forEach((m, i) => (m.file = `spread-${String(i + 1).padStart(2, '0')}`));

module.exports = { CHARACTERS, STYLE, LAYOUT, intro, missions, ending, cover };
