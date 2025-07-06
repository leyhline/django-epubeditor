from typing import Final
from unittest import TestCase

import defusedxml.ElementTree as ET

from .xhtml import insert_spans, to_text_without_ruby, strip_html

gongitsune_chapter_1_text_list: Final = [
    "これは、私が小さいときに、",
    "村の茂平というおじいさんからきいたお話です。",
    "むかしは、",
    "私たちの村のちかくの、",
    "中山というところに小さなお城があって、",
    "中山さまというおとのさまが、おられたそうです。",
    "その中山から、",
    "少しはなれた山の中に、",
    "「ごん狐」という狐がいました。",
    "ごんは、一人ぼっちの小狐で、",
    "しだの一ぱいしげった森の中に",
    "穴をほって住んでいました。",
    "そして、",
    "夜でも昼でも、",
    "あたりの村へ出てきて、",
    "いたずらばかりしました。",
    "はたけへ入って芋をほりちらしたり、",
    "菜種がらの、ほしてあるのへ火をつけたり、",
    "百姓家の裏手につるしてある",
    "とんがらしをむしりとって、いったり、いろんなことをしました。",
    "或秋のことでした。",
    "二、三日雨がふりつづいたその間、",
    "ごんは、外へも出られなくて",
    "穴の中にしゃがんでいました。",
    "雨があがると、ごんは、ほっとして穴からはい出ました。",
    "空はからっと晴れていて、",
    "百舌鳥の声が",
    "きんきん、ひびいていました。",
    "ごんは、",
    "村の小川の堤まで出て来ました。",
    "あたりの、すすきの穂には、",
    "まだ雨のしずくが光っていました。",
    "川は、",
    "いつもは水が少いのですが、",
    "三日もの雨で、水が、どっとましていました。",
    "ただのときは水につかることのない、",
    "川べりのすすきや、萩の株が、",
    "黄いろくにごった水に横だおしになって、もまれています。",
    "ごんは",
    "川下の方へと、",
    "ぬかるみみちを歩いていきました。",
    "ふと見ると、川の中に人がいて、何かやっています。",
    "ごんは、見つからないように、そうっと草の深いところへ歩きよって、",
    "そこからじっとのぞいてみました。",
    "「兵十だな」と、ごんは思いました。",
    "兵十はぼろぼろの黒いきものをまくし上げて、",
    "腰のところまで水にひたりながら、",
    "魚をとる、はりきりという、網をゆすぶっていました。",
    "はちまきをした顔の横っちょうに、",
    "まるい萩の葉が一まい、",
    "大きな黒子みたいにへばりついていました。",
    "しばらくすると、兵十は、",
    "はりきり網の一ばんうしろの、",
    "袋のようになったところを、水の中からもちあげました。",
    "その中には、",
    "芝の根や、草の葉や、",
    "くさった木ぎれなどが、",
    "ごちゃごちゃはいっていましたが、",
    "でもところどころ、白いものがきらきら光っています。",
    "それは、ふというなぎの腹や、",
    "大きなきすの腹でした。",
    "兵十は、",
    "びくの中へ、",
    "そのうなぎやきすを、ごみと一しょにぶちこみました。",
    "そして、また、",
    "袋の口をしばって、水の中へ入れました。",
    "兵十はそれから、びくをもって川から上り",
    "びくを土手においといて、",
    "何をさがしにか、",
    "川上の方へかけていきました。",
    "兵十がいなくなると、ごんは、",
    "ぴょいと草の中からとび出して、",
    "びくのそばへかけつけました。",
    "ちょいと、いたずらがしたくなったのです。",
    "ごんはびくの中の魚をつかみ出しては、",
    "はりきり網のかかっているところより下手の川の中を目がけて、ぽんぽん",
    "なげこみました。",
    "どの魚も、「とぼん」",
    "と音を立てながら、",
    "にごった水の中へもぐりこみました。",
    "一ばんしまいに、太いうなぎをつかみにかかりましたが、",
    "何しろぬるぬると",
    "すべりぬけるので、手ではつかめません。",
    "ごんは",
    "じれったくなって、",
    "頭をびくの中につッこんで、",
    "うなぎの頭を口にくわえました。",
    "うなぎは、キュッと言ってごんの首へまきつきました。",
    "そのとたんに兵十が、向うから、",
    "「うわアぬ",
    "すと狐め」と、どなりたてました。",
    "ごんは、びっくりしてとびあがりました。",
    "うなぎをふりすてて",
    "にげようとしましたが、",
    "うなぎは、ごんの首にまきついたままはなれません。",
    "ごんはそのまま横っとびにとび出して",
    "一しょうけんめいに、にげていきました。",
    "ほら穴の近くの、",
    "はんの木の下でふりかえって見ましたが、",
    "兵十は追っかけては来ませんでした。",
    "ごんは、ほっとして、うなぎの頭をかみくだき、",
    "やっとはずして穴のそとの、草の葉の上にのせておきました。",
]
gongitsune_chapter_1: Final = """<section>
<h1>一</h1>
<p>これは、<ruby>私<rp>（</rp><rt>わたし</rt><rp>）</rp></ruby>が小さいときに、村の<ruby>茂平<rp>（</rp><rt>もへい</rt><rp>）</rp></ruby>というおじいさんからきいたお話です。</p>
<p>むかしは、私たちの村のちかくの、<ruby>中山<rp>（</rp><rt>なかやま</rt><rp>）</rp></ruby>というところに小さなお城があって、中山さまというおとのさまが、おられたそうです。</p>
<p>その中山から、少しはなれた山の中に、「ごん<ruby>狐<rp>（</rp><rt>ぎつね</rt><rp>）</rp></ruby>」という狐がいました。ごんは、<ruby>一人<rp>（</rp><rt>ひとり</rt><rp>）</rp></ruby>ぼっちの小狐で、<em>しだ</em>の一ぱいしげった森の中に穴をほって住んでいました。そして、夜でも昼でも、あたりの村へ出てきて、いたずらばかりしました。はたけへ入って芋をほりちらしたり、<ruby>菜種<rp>（</rp><rt>なたね</rt><rp>）</rp></ruby><em>がら</em>の、ほしてあるのへ火をつけたり、<ruby>百姓家<rp>（</rp><rt>ひゃくしょうや</rt><rp>）</rp></ruby>の裏手につるしてあるとんがらしをむしりとって、いったり、いろんなことをしました。</p>
<p><ruby>或<rp>（</rp><rt>ある</rt><rp>）</rp></ruby><ruby>秋<rp>（</rp><rt>あき</rt><rp>）</rp></ruby>のことでした。二、三日雨がふりつづいたその<ruby>間<rp>（</rp><rt>あいだ</rt><rp>）</rp></ruby>、ごんは、外へも出られなくて穴の中にしゃがんでいました。</p>
<p>雨があがると、ごんは、ほっとして穴からはい出ました。空はからっと晴れていて、<ruby>百舌鳥<rp>（</rp><rt>もず</rt><rp>）</rp></ruby>の声がきんきん、ひびいていました。</p>
<p>ごんは、村の<ruby>小川<rp>（</rp><rt>おがわ</rt><rp>）</rp></ruby>の<ruby>堤<rp>（</rp><rt>つつみ</rt><rp>）</rp></ruby>まで出て来ました。あたりの、すすきの穂には、まだ雨のしずくが光っていました。川は、いつもは水が<ruby>少<rp>（</rp><rt>すくな</rt><rp>）</rp></ruby>いのですが、三日もの雨で、水が、どっとましていました。ただのときは水につかることのない、川べりのすすきや、<ruby>萩<rp>（</rp><rt>はぎ</rt><rp>）</rp></ruby>の株が、黄いろくにごった水に横だおしになって、もまれています。ごんは<ruby>川下<rp>（</rp><rt>かわしも</rt><rp>）</rp></ruby>の方へと、ぬかるみみちを歩いていきました。</p>
<p>ふと見ると、川の中に人がいて、何かやっています。ごんは、見つからないように、そうっと草の深いところへ歩きよって、そこからじっとのぞいてみました。</p>
<p class="quote">「<ruby>兵十<rp>（</rp><rt>ひょうじゅう</rt><rp>）</rp></ruby>だな」と、ごんは思いました。兵十はぼろぼろの黒いきものをまくし上げて、腰のところまで水にひたりながら、魚をとる、<em>はりきり</em>という、網をゆすぶっていました。はちまきをした顔の横っちょうに、まるい萩の葉が一まい、大きな<ruby>黒子<rp>（</rp><rt>ほくろ</rt><rp>）</rp></ruby>みたいにへばりついていました。</p>
<p>しばらくすると、兵十は、<em>はりきり</em>網の一ばんうしろの、袋のようになったところを、水の中からもちあげました。その中には、芝の根や、草の葉や、くさった木ぎれなどが、ごちゃごちゃはいっていましたが、でもところどころ、白いものがきらきら光っています。それは、ふとい<em>うなぎ</em>の腹や、大きな<em>きす</em>の腹でした。兵十は、びくの中へ、そのうなぎやきすを、ごみと一しょにぶちこみました。そして、また、袋の口をしばって、水の中へ入れました。</p>
<p>兵十はそれから、びくをもって川から<ruby>上<rp>（</rp><rt>あが</rt><rp>）</rp></ruby>りびくを<ruby>土手<rp>（</rp><rt>どて</rt><rp>）</rp></ruby>においといて、何をさがしにか、<ruby>川上<rp>（</rp><rt>かわかみ</rt><rp>）</rp></ruby>の方へかけていきました。</p>
<p>兵十がいなくなると、ごんは、ぴょいと草の中からとび出して、びくのそばへかけつけました。ちょいと、いたずらがしたくなったのです。ごんはびくの中の魚をつかみ出しては、<em>はりきり</em>網のかかっているところより<ruby>下手<rp>（</rp><rt>しもて</rt><rp>）</rp></ruby>の川の中を目がけて、ぽんぽんなげこみました。どの魚も、「とぼん」と音を立てながら、にごった水の中へもぐりこみました。</p>
<p>一ばんしまいに、太いうなぎをつかみにかかりましたが、何しろぬるぬるとすべりぬけるので、手ではつかめません。ごんはじれったくなって、頭をびくの中につッこんで、うなぎの頭を口にくわえました。うなぎは、キュッと言ってごんの首へまきつきました。そのとたんに兵十が、向うから、</p>
<p class="quote">「うわアぬすと狐め」と、どなりたてました。ごんは、びっくりしてとびあがりました。うなぎをふりすててにげようとしましたが、うなぎは、ごんの首にまきついたままはなれません。ごんはそのまま横っとびにとび出して一しょうけんめいに、にげていきました。</p>
<p>ほら穴の近くの、<em>はん</em>の木の下でふりかえって見ましたが、兵十は追っかけては来ませんでした。</p>
<p>ごんは、ほっとして、うなぎの頭をかみくだき、やっとはずして穴のそとの、草の葉の上にのせておきました。</p>
</section>"""
gongitsune_chapter_1_no_ruby: Final = """<section>
<h1>一</h1>
<p>これは、私が小さいときに、村の茂平というおじいさんからきいたお話です。</p>
<p>むかしは、私たちの村のちかくの、中山というところに小さなお城があって、中山さまというおとのさまが、おられたそうです。</p>
<p>その中山から、少しはなれた山の中に、「ごん狐」という狐がいました。ごんは、一人ぼっちの小狐で、<em>しだ</em>の一ぱいしげった森の中に穴をほって住んでいました。そして、夜でも昼でも、あたりの村へ出てきて、いたずらばかりしました。はたけへ入って芋をほりちらしたり、菜種<em>がら</em>の、ほしてあるのへ火をつけたり、百姓家の裏手につるしてあるとんがらしをむしりとって、いったり、いろんなことをしました。</p>
<p>或秋のことでした。二、三日雨がふりつづいたその間、ごんは、外へも出られなくて穴の中にしゃがんでいました。</p>
<p>雨があがると、ごんは、ほっとして穴からはい出ました。空はからっと晴れていて、百舌鳥の声がきんきん、ひびいていました。</p>
<p>ごんは、村の小川の堤まで出て来ました。あたりの、すすきの穂には、まだ雨のしずくが光っていました。川は、いつもは水が少いのですが、三日もの雨で、水が、どっとましていました。ただのときは水につかることのない、川べりのすすきや、萩の株が、黄いろくにごった水に横だおしになって、もまれています。ごんは川下の方へと、ぬかるみみちを歩いていきました。</p>
<p>ふと見ると、川の中に人がいて、何かやっています。ごんは、見つからないように、そうっと草の深いところへ歩きよって、そこからじっとのぞいてみました。</p>
<p class="quote">「兵十だな」と、ごんは思いました。兵十はぼろぼろの黒いきものをまくし上げて、腰のところまで水にひたりながら、魚をとる、<em>はりきり</em>という、網をゆすぶっていました。はちまきをした顔の横っちょうに、まるい萩の葉が一まい、大きな黒子みたいにへばりついていました。</p>
<p>しばらくすると、兵十は、<em>はりきり</em>網の一ばんうしろの、袋のようになったところを、水の中からもちあげました。その中には、芝の根や、草の葉や、くさった木ぎれなどが、ごちゃごちゃはいっていましたが、でもところどころ、白いものがきらきら光っています。それは、ふとい<em>うなぎ</em>の腹や、大きな<em>きす</em>の腹でした。兵十は、びくの中へ、そのうなぎやきすを、ごみと一しょにぶちこみました。そして、また、袋の口をしばって、水の中へ入れました。</p>
<p>兵十はそれから、びくをもって川から上りびくを土手においといて、何をさがしにか、川上の方へかけていきました。</p>
<p>兵十がいなくなると、ごんは、ぴょいと草の中からとび出して、びくのそばへかけつけました。ちょいと、いたずらがしたくなったのです。ごんはびくの中の魚をつかみ出しては、<em>はりきり</em>網のかかっているところより下手の川の中を目がけて、ぽんぽんなげこみました。どの魚も、「とぼん」と音を立てながら、にごった水の中へもぐりこみました。</p>
<p>一ばんしまいに、太いうなぎをつかみにかかりましたが、何しろぬるぬるとすべりぬけるので、手ではつかめません。ごんはじれったくなって、頭をびくの中につッこんで、うなぎの頭を口にくわえました。うなぎは、キュッと言ってごんの首へまきつきました。そのとたんに兵十が、向うから、</p>
<p class="quote">「うわアぬすと狐め」と、どなりたてました。ごんは、びっくりしてとびあがりました。うなぎをふりすててにげようとしましたが、うなぎは、ごんの首にまきついたままはなれません。ごんはそのまま横っとびにとび出して一しょうけんめいに、にげていきました。</p>
<p>ほら穴の近くの、<em>はん</em>の木の下でふりかえって見ましたが、兵十は追っかけては来ませんでした。</p>
<p>ごんは、ほっとして、うなぎの頭をかみくだき、やっとはずして穴のそとの、草の葉の上にのせておきました。</p>
</section>"""
gongitsune_chapter_1_expected: Final = """<section>
<h1>一</h1>
<p><span id="s0001">これは、<ruby>私<rp>（</rp><rt>わたし</rt><rp>）</rp></ruby>が小さいときに、</span><span id="s0002">村の<ruby>茂平<rp>（</rp><rt>もへい</rt><rp>）</rp></ruby>というおじいさんからきいたお話です。</span></p>
<p><span id="s0003">むかしは、</span><span id="s0004">私たちの村のちかくの、</span><span id="s0005"><ruby>中山<rp>（</rp><rt>なかやま</rt><rp>）</rp></ruby>というところに小さなお城があって、</span><span id="s0006">中山さまというおとのさまが、おられたそうです。</span></p>
<p><span id="s0007">その中山から、</span><span id="s0008">少しはなれた山の中に、</span><span id="s0009">「ごん<ruby>狐<rp>（</rp><rt>ぎつね</rt><rp>）</rp></ruby>」という狐がいました。</span><span id="s0010">ごんは、<ruby>一人<rp>（</rp><rt>ひとり</rt><rp>）</rp></ruby>ぼっちの小狐で、</span><span id="s0011"><em>しだ</em>の一ぱいしげった森の中に</span><span id="s0012">穴をほって住んでいました。</span><span id="s0013">そして、</span><span id="s0014">夜でも昼でも、</span><span id="s0015">あたりの村へ出てきて、</span><span id="s0016">いたずらばかりしました。</span><span id="s0017">はたけへ入って芋をほりちらしたり、</span><span id="s0018"><ruby>菜種<rp>（</rp><rt>なたね</rt><rp>）</rp></ruby><em>がら</em>の、ほしてあるのへ火をつけたり、</span><span id="s0019"><ruby>百姓家<rp>（</rp><rt>ひゃくしょうや</rt><rp>）</rp></ruby>の裏手につるしてある</span><span id="s0020">とんがらしをむしりとって、いったり、いろんなことをしました。</span></p>
<p><span id="s0021"><ruby>或<rp>（</rp><rt>ある</rt><rp>）</rp></ruby><ruby>秋<rp>（</rp><rt>あき</rt><rp>）</rp></ruby>のことでした。</span><span id="s0022">二、三日雨がふりつづいたその<ruby>間<rp>（</rp><rt>あいだ</rt><rp>）</rp></ruby>、</span><span id="s0023">ごんは、外へも出られなくて</span><span id="s0024">穴の中にしゃがんでいました。</span></p>
<p><span id="s0025">雨があがると、ごんは、ほっとして穴からはい出ました。</span><span id="s0026">空はからっと晴れていて、</span><span id="s0027"><ruby>百舌鳥<rp>（</rp><rt>もず</rt><rp>）</rp></ruby>の声が</span><span id="s0028">きんきん、ひびいていました。</span></p>
<p><span id="s0029">ごんは、</span><span id="s0030">村の<ruby>小川<rp>（</rp><rt>おがわ</rt><rp>）</rp></ruby>の<ruby>堤<rp>（</rp><rt>つつみ</rt><rp>）</rp></ruby>まで出て来ました。</span><span id="s0031">あたりの、すすきの穂には、</span><span id="s0032">まだ雨のしずくが光っていました。</span><span id="s0033">川は、</span><span id="s0034">いつもは水が<ruby>少<rp>（</rp><rt>すくな</rt><rp>）</rp></ruby>いのですが、</span><span id="s0035">三日もの雨で、水が、どっとましていました。</span><span id="s0036">ただのときは水につかることのない、</span><span id="s0037">川べりのすすきや、<ruby>萩<rp>（</rp><rt>はぎ</rt><rp>）</rp></ruby>の株が、</span><span id="s0038">黄いろくにごった水に横だおしになって、もまれています。</span><span id="s0039">ごんは</span><span id="s0040"><ruby>川下<rp>（</rp><rt>かわしも</rt><rp>）</rp></ruby>の方へと、</span><span id="s0041">ぬかるみみちを歩いていきました。</span></p>
<p><span id="s0042">ふと見ると、川の中に人がいて、何かやっています。</span><span id="s0043">ごんは、見つからないように、そうっと草の深いところへ歩きよって、</span><span id="s0044">そこからじっとのぞいてみました。</span></p>
<p class="quote"><span id="s0045">「<ruby>兵十<rp>（</rp><rt>ひょうじゅう</rt><rp>）</rp></ruby>だな」と、ごんは思いました。</span><span id="s0046">兵十はぼろぼろの黒いきものをまくし上げて、</span><span id="s0047">腰のところまで水にひたりながら、</span><span id="s0048">魚をとる、<em>はりきり</em>という、網をゆすぶっていました。</span><span id="s0049">はちまきをした顔の横っちょうに、</span><span id="s0050">まるい萩の葉が一まい、</span><span id="s0051">大きな<ruby>黒子<rp>（</rp><rt>ほくろ</rt><rp>）</rp></ruby>みたいにへばりついていました。</span></p>
<p><span id="s0052">しばらくすると、兵十は、</span><span id="s0053"><em>はりきり</em>網の一ばんうしろの、</span><span id="s0054">袋のようになったところを、水の中からもちあげました。</span><span id="s0055">その中には、</span><span id="s0056">芝の根や、草の葉や、</span><span id="s0057">くさった木ぎれなどが、</span><span id="s0058">ごちゃごちゃはいっていましたが、</span><span id="s0059">でもところどころ、白いものがきらきら光っています。</span><span id="s0060">それは、ふとい<em>うなぎ</em>の腹や、</span><span id="s0061">大きな<em>きす</em>の腹でした。</span><span id="s0062">兵十は、</span><span id="s0063">びくの中へ、</span><span id="s0064">そのうなぎやきすを、ごみと一しょにぶちこみました。</span><span id="s0065">そして、また、</span><span id="s0066">袋の口をしばって、水の中へ入れました。</span></p>
<p><span id="s0067">兵十はそれから、びくをもって川から<ruby>上<rp>（</rp><rt>あが</rt><rp>）</rp></ruby>り</span><span id="s0068">びくを<ruby>土手<rp>（</rp><rt>どて</rt><rp>）</rp></ruby>においといて、</span><span id="s0069">何をさがしにか、</span><span id="s0070"><ruby>川上<rp>（</rp><rt>かわかみ</rt><rp>）</rp></ruby>の方へかけていきました。</span></p>
<p><span id="s0071">兵十がいなくなると、ごんは、</span><span id="s0072">ぴょいと草の中からとび出して、</span><span id="s0073">びくのそばへかけつけました。</span><span id="s0074">ちょいと、いたずらがしたくなったのです。</span><span id="s0075">ごんはびくの中の魚をつかみ出しては、</span><span id="s0076"><em>はりきり</em>網のかかっているところより<ruby>下手<rp>（</rp><rt>しもて</rt><rp>）</rp></ruby>の川の中を目がけて、ぽんぽん</span><span id="s0077">なげこみました。</span><span id="s0078">どの魚も、「とぼん」</span><span id="s0079">と音を立てながら、</span><span id="s0080">にごった水の中へもぐりこみました。</span></p>
<p><span id="s0081">一ばんしまいに、太いうなぎをつかみにかかりましたが、</span><span id="s0082">何しろぬるぬると</span><span id="s0083">すべりぬけるので、手ではつかめません。</span><span id="s0084">ごんは</span><span id="s0085">じれったくなって、</span><span id="s0086">頭をびくの中につッこんで、</span><span id="s0087">うなぎの頭を口にくわえました。</span><span id="s0088">うなぎは、キュッと言ってごんの首へまきつきました。</span><span id="s0089">そのとたんに兵十が、向うから、</span></p>
<p class="quote"><span id="s0090">「うわアぬ</span><span id="s0091">すと狐め」と、どなりたてました。</span><span id="s0092">ごんは、びっくりしてとびあがりました。</span><span id="s0093">うなぎをふりすてて</span><span id="s0094">にげようとしましたが、</span><span id="s0095">うなぎは、ごんの首にまきついたままはなれません。</span><span id="s0096">ごんはそのまま横っとびにとび出して</span><span id="s0097">一しょうけんめいに、にげていきました。</span></p>
<p><span id="s0098">ほら穴の近くの、</span><span id="s0099"><em>はん</em>の木の下でふりかえって見ましたが、</span><span id="s0100">兵十は追っかけては来ませんでした。</span></p>
<p><span id="s0101">ごんは、ほっとして、うなぎの頭をかみくだき、</span><span id="s0102">やっとはずして穴のそとの、草の葉の上にのせておきました。</span></p>
</section>"""
gongitsune_chapter_1_expected_no_ruby: Final = """<section>
<h1>一</h1>
<p><span id="s0001">これは、私が小さいときに、</span><span id="s0002">村の茂平というおじいさんからきいたお話です。</span></p>
<p><span id="s0003">むかしは、</span><span id="s0004">私たちの村のちかくの、</span><span id="s0005">中山というところに小さなお城があって、</span><span id="s0006">中山さまというおとのさまが、おられたそうです。</span></p>
<p><span id="s0007">その中山から、</span><span id="s0008">少しはなれた山の中に、</span><span id="s0009">「ごん狐」という狐がいました。</span><span id="s0010">ごんは、一人ぼっちの小狐で、</span><span id="s0011"><em>しだ</em>の一ぱいしげった森の中に</span><span id="s0012">穴をほって住んでいました。</span><span id="s0013">そして、</span><span id="s0014">夜でも昼でも、</span><span id="s0015">あたりの村へ出てきて、</span><span id="s0016">いたずらばかりしました。</span><span id="s0017">はたけへ入って芋をほりちらしたり、</span><span id="s0018">菜種<em>がら</em>の、ほしてあるのへ火をつけたり、</span><span id="s0019">百姓家の裏手につるしてある</span><span id="s0020">とんがらしをむしりとって、いったり、いろんなことをしました。</span></p>
<p><span id="s0021">或秋のことでした。</span><span id="s0022">二、三日雨がふりつづいたその間、</span><span id="s0023">ごんは、外へも出られなくて</span><span id="s0024">穴の中にしゃがんでいました。</span></p>
<p><span id="s0025">雨があがると、ごんは、ほっとして穴からはい出ました。</span><span id="s0026">空はからっと晴れていて、</span><span id="s0027">百舌鳥の声が</span><span id="s0028">きんきん、ひびいていました。</span></p>
<p><span id="s0029">ごんは、</span><span id="s0030">村の小川の堤まで出て来ました。</span><span id="s0031">あたりの、すすきの穂には、</span><span id="s0032">まだ雨のしずくが光っていました。</span><span id="s0033">川は、</span><span id="s0034">いつもは水が少いのですが、</span><span id="s0035">三日もの雨で、水が、どっとましていました。</span><span id="s0036">ただのときは水につかることのない、</span><span id="s0037">川べりのすすきや、萩の株が、</span><span id="s0038">黄いろくにごった水に横だおしになって、もまれています。</span><span id="s0039">ごんは</span><span id="s0040">川下の方へと、</span><span id="s0041">ぬかるみみちを歩いていきました。</span></p>
<p><span id="s0042">ふと見ると、川の中に人がいて、何かやっています。</span><span id="s0043">ごんは、見つからないように、そうっと草の深いところへ歩きよって、</span><span id="s0044">そこからじっとのぞいてみました。</span></p>
<p class="quote"><span id="s0045">「兵十だな」と、ごんは思いました。</span><span id="s0046">兵十はぼろぼろの黒いきものをまくし上げて、</span><span id="s0047">腰のところまで水にひたりながら、</span><span id="s0048">魚をとる、<em>はりきり</em>という、網をゆすぶっていました。</span><span id="s0049">はちまきをした顔の横っちょうに、</span><span id="s0050">まるい萩の葉が一まい、</span><span id="s0051">大きな黒子みたいにへばりついていました。</span></p>
<p><span id="s0052">しばらくすると、兵十は、</span><span id="s0053"><em>はりきり</em>網の一ばんうしろの、</span><span id="s0054">袋のようになったところを、水の中からもちあげました。</span><span id="s0055">その中には、</span><span id="s0056">芝の根や、草の葉や、</span><span id="s0057">くさった木ぎれなどが、</span><span id="s0058">ごちゃごちゃはいっていましたが、</span><span id="s0059">でもところどころ、白いものがきらきら光っています。</span><span id="s0060">それは、ふとい<em>うなぎ</em>の腹や、</span><span id="s0061">大きな<em>きす</em>の腹でした。</span><span id="s0062">兵十は、</span><span id="s0063">びくの中へ、</span><span id="s0064">そのうなぎやきすを、ごみと一しょにぶちこみました。</span><span id="s0065">そして、また、</span><span id="s0066">袋の口をしばって、水の中へ入れました。</span></p>
<p><span id="s0067">兵十はそれから、びくをもって川から上り</span><span id="s0068">びくを土手においといて、</span><span id="s0069">何をさがしにか、</span><span id="s0070">川上の方へかけていきました。</span></p>
<p><span id="s0071">兵十がいなくなると、ごんは、</span><span id="s0072">ぴょいと草の中からとび出して、</span><span id="s0073">びくのそばへかけつけました。</span><span id="s0074">ちょいと、いたずらがしたくなったのです。</span><span id="s0075">ごんはびくの中の魚をつかみ出しては、</span><span id="s0076"><em>はりきり</em>網のかかっているところより下手の川の中を目がけて、ぽんぽん</span><span id="s0077">なげこみました。</span><span id="s0078">どの魚も、「とぼん」</span><span id="s0079">と音を立てながら、</span><span id="s0080">にごった水の中へもぐりこみました。</span></p>
<p><span id="s0081">一ばんしまいに、太いうなぎをつかみにかかりましたが、</span><span id="s0082">何しろぬるぬると</span><span id="s0083">すべりぬけるので、手ではつかめません。</span><span id="s0084">ごんは</span><span id="s0085">じれったくなって、</span><span id="s0086">頭をびくの中につッこんで、</span><span id="s0087">うなぎの頭を口にくわえました。</span><span id="s0088">うなぎは、キュッと言ってごんの首へまきつきました。</span><span id="s0089">そのとたんに兵十が、向うから、</span></p>
<p class="quote"><span id="s0090">「うわアぬ</span><span id="s0091">すと狐め」と、どなりたてました。</span><span id="s0092">ごんは、びっくりしてとびあがりました。</span><span id="s0093">うなぎをふりすてて</span><span id="s0094">にげようとしましたが、</span><span id="s0095">うなぎは、ごんの首にまきついたままはなれません。</span><span id="s0096">ごんはそのまま横っとびにとび出して</span><span id="s0097">一しょうけんめいに、にげていきました。</span></p>
<p><span id="s0098">ほら穴の近くの、</span><span id="s0099"><em>はん</em>の木の下でふりかえって見ましたが、</span><span id="s0100">兵十は追っかけては来ませんでした。</span></p>
<p><span id="s0101">ごんは、ほっとして、うなぎの頭をかみくだき、</span><span id="s0102">やっとはずして穴のそとの、草の葉の上にのせておきました。</span></p>
</section>"""

gongitsune_chapter_1_body = """<body xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<section epub:type="chapter">
<h1>一</h1>
<p>これは、<ruby>私<rt>わたし</rt></ruby>が小さいときに、村の<ruby>茂平<rt>もへい</rt></ruby>というおじいさんからきいたお話です。</p>
<p>むかしは、私たちの村のちかくの、<ruby>中山<rt>なかやま</rt></ruby>というところに小さなお城があって、中山さまというおとのさまが、おられたそうです。</p>
<p>その中山から、少しはなれた山の中に、「ごん<ruby>狐<rt>ぎつね</rt></ruby>」という狐がいました。ごんは、<ruby>一人<rt>ひとり</rt></ruby>ぼっちの小狐で、<em>しだ</em>の一ぱいしげった森の中に穴をほって住んでいました。そして、夜でも昼でも、あたりの村へ出てきて、いたずらばかりしました。はたけへ入って芋をほりちらしたり、<ruby>菜種<rt>なたね</rt></ruby><em>がら</em>の、ほしてあるのへ火をつけたり、<ruby>百姓家<rt>ひゃくしょうや</rt></ruby>の裏手につるしてあるとんがらしをむしりとって、いったり、いろんなことをしました。</p>
<p><ruby>或<rt>ある</rt></ruby><ruby>秋<rt>あき</rt></ruby>のことでした。二、三日雨がふりつづいたその<ruby>間<rt>あいだ</rt></ruby>、ごんは、外へも出られなくて穴の中にしゃがんでいました。</p>
<p>雨があがると、ごんは、ほっとして穴からはい出ました。空はからっと晴れていて、<ruby>百舌鳥<rt>もず</rt></ruby>の声がきんきん、ひびいていました。</p>
<p>ごんは、村の<ruby>小川<rt>おがわ</rt></ruby>の<ruby>堤<rt>つつみ</rt></ruby>まで出て来ました。あたりの、すすきの穂には、まだ雨のしずくが光っていました。川は、いつもは水が<ruby>少<rt>すくな</rt></ruby>いのですが、三日もの雨で、水が、どっとましていました。ただのときは水につかることのない、川べりのすすきや、<ruby>萩<rt>はぎ</rt></ruby>の株が、黄いろくにごった水に横だおしになって、もまれています。ごんは<ruby>川下<rt>かわしも</rt></ruby>の方へと、ぬかるみみちを歩いていきました。</p>
<p>ふと見ると、川の中に人がいて、何かやっています。ごんは、見つからないように、そうっと草の深いところへ歩きよって、そこからじっとのぞいてみました。</p>
<p class="quote">「<ruby>兵十<rt>ひょうじゅう</rt></ruby>だな」と、ごんは思いました。兵十はぼろぼろの黒いきものをまくし上げて、腰のところまで水にひたりながら、魚をとる、<em>はりきり</em>という、網をゆすぶっていました。はちまきをした顔の横っちょうに、まるい萩の葉が一まい、大きな<ruby>黒子<rt>ほくろ</rt></ruby>みたいにへばりついていました。</p>
<p>しばらくすると、兵十は、<em>はりきり</em>網の一ばんうしろの、袋のようになったところを、水の中からもちあげました。その中には、芝の根や、草の葉や、くさった木ぎれなどが、ごちゃごちゃはいっていましたが、でもところどころ、白いものがきらきら光っています。それは、ふとい<em>うなぎ</em>の腹や、大きな<em>きす</em>の腹でした。兵十は、びくの中へ、そのうなぎやきすを、ごみと一しょにぶちこみました。そして、また、袋の口をしばって、水の中へ入れました。</p>
<p>兵十はそれから、びくをもって川から<ruby>上<rt>あが</rt></ruby>りびくを<ruby>土手<rt>どて</rt></ruby>においといて、何をさがしにか、<ruby>川上<rt>かわかみ</rt></ruby>の方へかけていきました。</p>
<p>兵十がいなくなると、ごんは、ぴょいと草の中からとび出して、びくのそばへかけつけました。ちょいと、いたずらがしたくなったのです。ごんはびくの中の魚をつかみ出しては、<em>はりきり</em>網のかかっているところより<ruby>下手<rt>しもて</rt></ruby>の川の中を目がけて、ぽんぽんなげこみました。どの魚も、「とぼん」と音を立てながら、にごった水の中へもぐりこみました。</p>
<p>一ばんしまいに、太いうなぎをつかみにかかりましたが、何しろぬるぬるとすべりぬけるので、手ではつかめません。ごんはじれったくなって、頭をびくの中につッこんで、うなぎの頭を口にくわえました。うなぎは、キュッと言ってごんの首へまきつきました。そのとたんに兵十が、向うから、</p>
<p class="quote">「うわアぬすと狐め」と、どなりたてました。ごんは、びっくりしてとびあがりました。うなぎをふりすててにげようとしましたが、うなぎは、ごんの首にまきついたままはなれません。ごんはそのまま横っとびにとび出して一しょうけんめいに、にげていきました。</p>
<p>ほら穴の近くの、<em>はん</em>の木の下でふりかえって見ましたが、兵十は追っかけては来ませんでした。</p>
<p>ごんは、ほっとして、うなぎの頭をかみくだき、やっとはずして穴のそとの、草の葉の上にのせておきました。</p>
</section>
</body>"""
gongitsune_chapter_1_expected_body = """<body xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<section epub:type="chapter">
<h1>一</h1>
<p><span id="s0001">これは、<ruby>私<rt>わたし</rt></ruby>が小さいときに、</span><span id="s0002">村の<ruby>茂平<rt>もへい</rt></ruby>というおじいさんからきいたお話です。</span></p>
<p><span id="s0003">むかしは、</span><span id="s0004">私たちの村のちかくの、</span><span id="s0005"><ruby>中山<rt>なかやま</rt></ruby>というところに小さなお城があって、</span><span id="s0006">中山さまというおとのさまが、おられたそうです。</span></p>
<p><span id="s0007">その中山から、</span><span id="s0008">少しはなれた山の中に、</span><span id="s0009">「ごん<ruby>狐<rt>ぎつね</rt></ruby>」という狐がいました。</span><span id="s0010">ごんは、<ruby>一人<rt>ひとり</rt></ruby>ぼっちの小狐で、</span><span id="s0011"><em>しだ</em>の一ぱいしげった森の中に</span><span id="s0012">穴をほって住んでいました。</span><span id="s0013">そして、</span><span id="s0014">夜でも昼でも、</span><span id="s0015">あたりの村へ出てきて、</span><span id="s0016">いたずらばかりしました。</span><span id="s0017">はたけへ入って芋をほりちらしたり、</span><span id="s0018"><ruby>菜種<rt>なたね</rt></ruby><em>がら</em>の、ほしてあるのへ火をつけたり、</span><span id="s0019"><ruby>百姓家<rt>ひゃくしょうや</rt></ruby>の裏手につるしてある</span><span id="s0020">とんがらしをむしりとって、いったり、いろんなことをしました。</span></p>
<p><span id="s0021"><ruby>或<rt>ある</rt></ruby><ruby>秋<rt>あき</rt></ruby>のことでした。</span><span id="s0022">二、三日雨がふりつづいたその<ruby>間<rt>あいだ</rt></ruby>、</span><span id="s0023">ごんは、外へも出られなくて</span><span id="s0024">穴の中にしゃがんでいました。</span></p>
<p><span id="s0025">雨があがると、ごんは、ほっとして穴からはい出ました。</span><span id="s0026">空はからっと晴れていて、</span><span id="s0027"><ruby>百舌鳥<rt>もず</rt></ruby>の声が</span><span id="s0028">きんきん、ひびいていました。</span></p>
<p><span id="s0029">ごんは、</span><span id="s0030">村の<ruby>小川<rt>おがわ</rt></ruby>の<ruby>堤<rt>つつみ</rt></ruby>まで出て来ました。</span><span id="s0031">あたりの、すすきの穂には、</span><span id="s0032">まだ雨のしずくが光っていました。</span><span id="s0033">川は、</span><span id="s0034">いつもは水が<ruby>少<rt>すくな</rt></ruby>いのですが、</span><span id="s0035">三日もの雨で、水が、どっとましていました。</span><span id="s0036">ただのときは水につかることのない、</span><span id="s0037">川べりのすすきや、<ruby>萩<rt>はぎ</rt></ruby>の株が、</span><span id="s0038">黄いろくにごった水に横だおしになって、もまれています。</span><span id="s0039">ごんは</span><span id="s0040"><ruby>川下<rt>かわしも</rt></ruby>の方へと、</span><span id="s0041">ぬかるみみちを歩いていきました。</span></p>
<p><span id="s0042">ふと見ると、川の中に人がいて、何かやっています。</span><span id="s0043">ごんは、見つからないように、そうっと草の深いところへ歩きよって、</span><span id="s0044">そこからじっとのぞいてみました。</span></p>
<p class="quote"><span id="s0045">「<ruby>兵十<rt>ひょうじゅう</rt></ruby>だな」と、ごんは思いました。</span><span id="s0046">兵十はぼろぼろの黒いきものをまくし上げて、</span><span id="s0047">腰のところまで水にひたりながら、</span><span id="s0048">魚をとる、<em>はりきり</em>という、網をゆすぶっていました。</span><span id="s0049">はちまきをした顔の横っちょうに、</span><span id="s0050">まるい萩の葉が一まい、</span><span id="s0051">大きな<ruby>黒子<rt>ほくろ</rt></ruby>みたいにへばりついていました。</span></p>
<p><span id="s0052">しばらくすると、兵十は、</span><span id="s0053"><em>はりきり</em>網の一ばんうしろの、</span><span id="s0054">袋のようになったところを、水の中からもちあげました。</span><span id="s0055">その中には、</span><span id="s0056">芝の根や、草の葉や、</span><span id="s0057">くさった木ぎれなどが、</span><span id="s0058">ごちゃごちゃはいっていましたが、</span><span id="s0059">でもところどころ、白いものがきらきら光っています。</span><span id="s0060">それは、ふとい<em>うなぎ</em>の腹や、</span><span id="s0061">大きな<em>きす</em>の腹でした。</span><span id="s0062">兵十は、</span><span id="s0063">びくの中へ、</span><span id="s0064">そのうなぎやきすを、ごみと一しょにぶちこみました。</span><span id="s0065">そして、また、</span><span id="s0066">袋の口をしばって、水の中へ入れました。</span></p>
<p><span id="s0067">兵十はそれから、びくをもって川から<ruby>上<rt>あが</rt></ruby>り</span><span id="s0068">びくを<ruby>土手<rt>どて</rt></ruby>においといて、</span><span id="s0069">何をさがしにか、</span><span id="s0070"><ruby>川上<rt>かわかみ</rt></ruby>の方へかけていきました。</span></p>
<p><span id="s0071">兵十がいなくなると、ごんは、</span><span id="s0072">ぴょいと草の中からとび出して、</span><span id="s0073">びくのそばへかけつけました。</span><span id="s0074">ちょいと、いたずらがしたくなったのです。</span><span id="s0075">ごんはびくの中の魚をつかみ出しては、</span><span id="s0076"><em>はりきり</em>網のかかっているところより<ruby>下手<rt>しもて</rt></ruby>の川の中を目がけて、ぽんぽん</span><span id="s0077">なげこみました。</span><span id="s0078">どの魚も、「とぼん」</span><span id="s0079">と音を立てながら、</span><span id="s0080">にごった水の中へもぐりこみました。</span></p>
<p><span id="s0081">一ばんしまいに、太いうなぎをつかみにかかりましたが、</span><span id="s0082">何しろぬるぬると</span><span id="s0083">すべりぬけるので、手ではつかめません。</span><span id="s0084">ごんは</span><span id="s0085">じれったくなって、</span><span id="s0086">頭をびくの中につッこんで、</span><span id="s0087">うなぎの頭を口にくわえました。</span><span id="s0088">うなぎは、キュッと言ってごんの首へまきつきました。</span><span id="s0089">そのとたんに兵十が、向うから、</span></p>
<p class="quote"><span id="s0090">「うわアぬ</span><span id="s0091">すと狐め」と、どなりたてました。</span><span id="s0092">ごんは、びっくりしてとびあがりました。</span><span id="s0093">うなぎをふりすてて</span><span id="s0094">にげようとしましたが、</span><span id="s0095">うなぎは、ごんの首にまきついたままはなれません。</span><span id="s0096">ごんはそのまま横っとびにとび出して</span><span id="s0097">一しょうけんめいに、にげていきました。</span></p>
<p><span id="s0098">ほら穴の近くの、</span><span id="s0099"><em>はん</em>の木の下でふりかえって見ましたが、</span><span id="s0100">兵十は追っかけては来ませんでした。</span></p>
<p><span id="s0101">ごんは、ほっとして、うなぎの頭をかみくだき、</span><span id="s0102">やっとはずして穴のそとの、草の葉の上にのせておきました。</span></p>
</section>
</body>"""


class TestCase_to_text_without_ruby(TestCase):
    def test_on_japanese_with_furigana(self):
        root = ET.fromstring("<p>これは、<ruby>私<rp>（</rp><rt>わたし</rt><rp>）</rp></ruby>が小さいときに、村の<ruby>茂平<rp>（</rp><rt>もへい</rt><rp>）</rp></ruby>というおじいさんからきいたお話です。</p>")  # fmt: skip
        result = to_text_without_ruby(root)
        self.assertEqual("これは、私が小さいときに、村の茂平というおじいさんからきいたお話です。", result)


class TestCase_strip_html(TestCase):
    def test_on_mdn_example(self):
        given = "\n<h1>   Hello \n\t\t\t\t<span> World!</span>\t  </h1>\n"
        expected = "<h1>Hello <span>World!</span></h1>"
        element = ET.fromstring(given)
        strip_html(element)
        actual = ET.tostring(element, "unicode")
        self.assertEqual(expected, actual)

    def test_on_block_start_and_end(self):
        given = "<h1>   prefix <span>Hello</span> <span>World!</span>     </h1>"
        expected = "<h1>prefix <span>Hello</span> <span>World!</span></h1>"
        element = ET.fromstring(given)
        strip_html(element)
        actual = ET.tostring(element, "unicode")
        self.assertEqual(expected, actual)

    def test_on_text_between_spans(self):
        given = "<h1>   prefix <span>Hello</span>   my  <span>World!</span>     </h1>"
        expected = "<h1>prefix <span>Hello</span> my <span>World!</span></h1>"
        element = ET.fromstring(given)
        strip_html(element)
        actual = ET.tostring(element, "unicode")
        self.assertEqual(expected, actual)

    def test_on_consecutive_whitespaces(self):
        given = "<h1><span>        Hello     World!     </span></h1>"
        expected = "<h1><span> Hello World! </span></h1>"
        element = ET.fromstring(given)
        strip_html(element)
        actual = ET.tostring(element, "unicode")
        self.assertEqual(expected, actual)

    def test_on_consecutive_spans(self):
        given = "<h1><span>Hello    </span><span>    World!   </span>   </h1>"
        expected = "<h1><span>Hello </span><span>World! </span></h1>"
        element = ET.fromstring(given)
        strip_html(element)
        actual = ET.tostring(element, "unicode")
        self.assertEqual(expected, actual)


class TestCase_insert_spans(TestCase):
    def test_on_gongitsune_chapter_1(self):
        expected_xml = ET.fromstring(gongitsune_chapter_1_expected)
        actual_xml = ET.fromstring(gongitsune_chapter_1)
        insert_spans(actual_xml, gongitsune_chapter_1_text_list.copy())
        for expected_child, actual_child in zip(expected_xml, actual_xml):
            expected_string = ET.tostring(expected_child, "unicode")
            actual_string = ET.tostring(actual_child, "unicode")
            self.assertEqual(expected_string, actual_string)

    def test_on_gongitsune_chapter_1_no_ruby(self):
        expected_xml = ET.fromstring(gongitsune_chapter_1_expected_no_ruby)
        actual_xml = ET.fromstring(gongitsune_chapter_1_no_ruby)
        insert_spans(actual_xml, gongitsune_chapter_1_text_list.copy())
        for expected_child, actual_child in zip(expected_xml, actual_xml):
            expected_string = ET.tostring(expected_child, "unicode")
            actual_string = ET.tostring(actual_child, "unicode")
            self.assertEqual(expected_string, actual_string)

    def test_on_gongitsune_chapter_1_with_ns(self):
        expected_xml = ET.fromstring(gongitsune_chapter_1_expected_body)
        actual_xml = ET.fromstring(gongitsune_chapter_1_body)
        insert_spans(actual_xml, gongitsune_chapter_1_text_list.copy())
        for expected_child, actual_child in zip(expected_xml[0], actual_xml[0]):
            expected_string = ET.tostring(expected_child, "unicode")
            actual_string = ET.tostring(actual_child, "unicode")
            self.assertEqual(expected_string, actual_string)

    def test_on_short_input(self):
        actual_xml = ET.fromstring(
            "<section><p><span>Hello, World. <b>Here</b> I <b>am</b>!</span><span>foobar</span></p></section>"
        )
        insert_spans(actual_xml, ["Hello, World. ", "Here I am!", "foo", "bar"])
        actual_string = ET.tostring(actual_xml, "unicode")
        self.assertEqual(
            '<section><p><span><span id="s0001">Hello, World. </span><span id="s0002"><b>Here</b> I <b>am</b>!</span></span><span><span id="s0003">foo</span><span id="s0004">bar</span></span></p></section>',
            actual_string,
        )

    def test_on_short_input_with_prefix(self):
        actual_xml = ET.fromstring("<section><p>prefix <span>Hello, World.</span></p></section>")
        insert_spans(actual_xml, ["Hello, World."])
        actual_string = ET.tostring(actual_xml, "unicode")
        self.assertEqual(
            '<section><p>prefix <span><span id="s0001">Hello, World.</span></span></p></section>', actual_string
        )

    def test_on_short_input_with_prefix_tag(self):
        actual_xml = ET.fromstring("<section><p><h1>prefix</h1> <span>Hello, World.</span></p></section>")
        insert_spans(actual_xml, ["Hello, World."])
        actual_string = ET.tostring(actual_xml, "unicode")
        self.assertEqual(
            '<section><p><h1>prefix</h1> <span><span id="s0001">Hello, World.</span></span></p></section>',
            actual_string,
        )
