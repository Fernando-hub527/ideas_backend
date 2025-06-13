--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Ubuntu 17.5-1.pgdg24.10+1)

-- Started on 2025-06-13 07:28:24 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16407)
-- Name: comment; Type: TABLE; Schema: public; Owner: demo
--

CREATE TABLE public.comment (
    id integer NOT NULL,
    comment character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "ideaId" integer,
    "userId" integer
);


ALTER TABLE public.comment OWNER TO demo;

--
-- TOC entry 221 (class 1259 OID 16406)
-- Name: comment_id_seq; Type: SEQUENCE; Schema: public; Owner: demo
--

CREATE SEQUENCE public.comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comment_id_seq OWNER TO demo;

--
-- TOC entry 3405 (class 0 OID 0)
-- Dependencies: 221
-- Name: comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: demo
--

ALTER SEQUENCE public.comment_id_seq OWNED BY public.comment.id;


--
-- TOC entry 224 (class 1259 OID 16417)
-- Name: idea; Type: TABLE; Schema: public; Owner: demo
--

CREATE TABLE public.idea (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    category character varying NOT NULL,
    "authorId" integer
);


ALTER TABLE public.idea OWNER TO demo;

--
-- TOC entry 223 (class 1259 OID 16416)
-- Name: idea_id_seq; Type: SEQUENCE; Schema: public; Owner: demo
--

CREATE SEQUENCE public.idea_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.idea_id_seq OWNER TO demo;

--
-- TOC entry 3406 (class 0 OID 0)
-- Dependencies: 223
-- Name: idea_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: demo
--

ALTER SEQUENCE public.idea_id_seq OWNED BY public.idea.id;


--
-- TOC entry 218 (class 1259 OID 16388)
-- Name: user; Type: TABLE; Schema: public; Owner: demo
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying NOT NULL,
    name character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public."user" OWNER TO demo;

--
-- TOC entry 217 (class 1259 OID 16387)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: demo
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO demo;

--
-- TOC entry 3407 (class 0 OID 0)
-- Dependencies: 217
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: demo
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 220 (class 1259 OID 16399)
-- Name: votes; Type: TABLE; Schema: public; Owner: demo
--

CREATE TABLE public.votes (
    id integer NOT NULL,
    liked boolean NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "ideaId" integer,
    "userId" integer
);


ALTER TABLE public.votes OWNER TO demo;

--
-- TOC entry 219 (class 1259 OID 16398)
-- Name: votes_id_seq; Type: SEQUENCE; Schema: public; Owner: demo
--

CREATE SEQUENCE public.votes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.votes_id_seq OWNER TO demo;

--
-- TOC entry 3408 (class 0 OID 0)
-- Dependencies: 219
-- Name: votes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: demo
--

ALTER SEQUENCE public.votes_id_seq OWNED BY public.votes.id;


--
-- TOC entry 3228 (class 2604 OID 16410)
-- Name: comment id; Type: DEFAULT; Schema: public; Owner: demo
--

ALTER TABLE ONLY public.comment ALTER COLUMN id SET DEFAULT nextval('public.comment_id_seq'::regclass);


--
-- TOC entry 3230 (class 2604 OID 16420)
-- Name: idea id; Type: DEFAULT; Schema: public; Owner: demo
--

ALTER TABLE ONLY public.idea ALTER COLUMN id SET DEFAULT nextval('public.idea_id_seq'::regclass);


--
-- TOC entry 3225 (class 2604 OID 16391)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: demo
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 3226 (class 2604 OID 16402)
-- Name: votes id; Type: DEFAULT; Schema: public; Owner: demo
--

ALTER TABLE ONLY public.votes ALTER COLUMN id SET DEFAULT nextval('public.votes_id_seq'::regclass);


--
-- TOC entry 3397 (class 0 OID 16407)
-- Dependencies: 222
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: demo
--

INSERT INTO public.comment VALUES (1, 'Under require page claim future in opportunity you exist me value generation pick.', '2025-05-10 11:25:38', 21, 19);
INSERT INTO public.comment VALUES (2, 'Picture send cultural whatever computer on fast play fact issue radio especially road get.', '2025-01-07 08:53:15', 16, 10);
INSERT INTO public.comment VALUES (3, 'Party close issue huge away represent race sing.', '2025-03-28 12:28:29', 12, 7);
INSERT INTO public.comment VALUES (4, 'Catch check clearly ahead career manage tonight perhaps explain soldier range sort trial study significant.', '2025-02-01 12:55:30', 12, 2);
INSERT INTO public.comment VALUES (5, 'Garden maybe forward reason treatment worker season figure they.', '2025-02-24 05:14:37', 40, 9);
INSERT INTO public.comment VALUES (6, 'Hope likely fill improve image best win challenge on plant wonder thing.', '2025-01-02 10:47:04', 31, 3);
INSERT INTO public.comment VALUES (7, 'Other owner message entire rule collection be along break gun.', '2025-05-01 23:55:08', 6, 5);
INSERT INTO public.comment VALUES (8, 'Five put hard recent project speech director city necessary thus sister meet though ago.', '2025-04-16 14:34:42', 10, 2);
INSERT INTO public.comment VALUES (9, 'These military part decade remain if again care hold.', '2025-06-02 14:13:56', 6, 18);
INSERT INTO public.comment VALUES (10, 'North trouble upon beautiful open free medical lay lose big strategy make population.', '2025-03-14 11:50:17', 26, 17);
INSERT INTO public.comment VALUES (11, 'Congress must city system story century attention attention hotel well news.', '2025-02-02 06:26:20', 18, 17);
INSERT INTO public.comment VALUES (12, 'Director book cell speech catch ten statement carry next according television next sense make.', '2025-04-25 18:35:43', 16, 7);
INSERT INTO public.comment VALUES (13, 'Use nice themselves gas best above dinner stuff.', '2025-02-11 04:40:10', 38, 14);
INSERT INTO public.comment VALUES (14, 'Different many water meeting future back off difficult happen high serve.', '2025-01-26 16:27:51', 38, 9);
INSERT INTO public.comment VALUES (15, 'Very score loss they grow his can sing husband matter likely.', '2025-04-19 03:01:28', 29, 16);
INSERT INTO public.comment VALUES (16, 'Place grow everyone win should research executive black tough building child usually.', '2025-05-06 01:07:34', 23, 3);
INSERT INTO public.comment VALUES (17, 'Upon full director race wish let left very your.', '2025-05-22 14:04:54', 21, 20);
INSERT INTO public.comment VALUES (18, 'Determine human find discussion military ability line hour wear star issue any side image enjoy rise.', '2025-01-16 09:11:58', 8, 16);
INSERT INTO public.comment VALUES (19, 'Congress recognize agreement well account movement can start.', '2025-04-09 08:35:44', 38, 11);
INSERT INTO public.comment VALUES (20, 'Bank letter summer minute perform indeed Mr unit dinner indeed.', '2025-03-14 21:11:15', 13, 8);
INSERT INTO public.comment VALUES (21, 'Job high she past especially old region.', '2025-05-22 07:27:31', 2, 9);
INSERT INTO public.comment VALUES (22, 'Quality political other begin war resource evening realize per probably her of.', '2025-04-19 20:56:43', 8, 8);
INSERT INTO public.comment VALUES (23, 'Cut meet build black treat buy throw like lawyer fund indicate help.', '2025-04-01 10:00:24', 24, 6);
INSERT INTO public.comment VALUES (24, 'Friend state do eat lose various agency rich accept if share land involve education.', '2025-03-14 23:06:06', 22, 14);
INSERT INTO public.comment VALUES (25, 'Direction exist president outside upon why mission because feel.', '2025-03-23 06:08:28', 4, 4);
INSERT INTO public.comment VALUES (26, 'Pull watch choice already thank source she light question in court hospital skin soon which thought.', '2025-04-24 03:44:23', 10, 8);
INSERT INTO public.comment VALUES (27, 'Could foreign mind myself surface old charge read management production up our allow maintain page.', '2025-02-12 09:31:35', 3, 19);
INSERT INTO public.comment VALUES (28, 'Room a artist drug them particular produce board whole middle under plant expert raise management.', '2025-01-19 00:27:42', 35, 20);
INSERT INTO public.comment VALUES (29, 'Head successful response hospital wrong fish yeah attack detail.', '2025-01-03 16:59:48', 5, 1);
INSERT INTO public.comment VALUES (30, 'West hour less music throughout region again debate take.', '2025-04-05 09:30:04', 8, 7);
INSERT INTO public.comment VALUES (31, 'Them in decision above you carry poor majority herself Mr bad wide manage address information.', '2025-05-08 17:48:43', 39, 19);
INSERT INTO public.comment VALUES (32, 'Fine seat should dream whose agreement tell mention check election order everything.', '2025-05-24 12:19:15', 8, 13);
INSERT INTO public.comment VALUES (33, 'Him second until direction opportunity very analysis firm once machine.', '2025-03-25 02:27:25', 6, 12);
INSERT INTO public.comment VALUES (34, 'Itself history the bring parent very card center all relationship easy picture enough break.', '2025-02-07 08:05:16', 8, 2);
INSERT INTO public.comment VALUES (35, 'Pattern PM seat my arrive middle add traditional standard PM election case.', '2024-12-31 23:52:22', 39, 1);
INSERT INTO public.comment VALUES (36, 'Night western serious edge bit avoid yourself campaign alone subject development best student describe concern professional.', '2025-01-26 09:35:23', 13, 6);
INSERT INTO public.comment VALUES (37, 'Cut recognize keep citizen result thus wind natural customer letter finish campaign night.', '2025-05-12 10:16:57', 8, 16);
INSERT INTO public.comment VALUES (38, 'Bar standard final relationship wear along particularly.', '2025-02-07 11:41:59', 14, 2);
INSERT INTO public.comment VALUES (39, 'Coach every cut never ten become me story.', '2025-01-05 12:51:25', 2, 18);
INSERT INTO public.comment VALUES (40, 'Order leg food fast pick purpose expert age.', '2024-12-14 07:18:28', 28, 20);
INSERT INTO public.comment VALUES (41, 'Away wish finish within president explain situation eat thousand might employee.', '2024-12-23 14:23:00', 7, 9);
INSERT INTO public.comment VALUES (42, 'Industry old effect fine speak majority large but hear minute discuss space himself.', '2025-01-28 00:26:18', 5, 8);
INSERT INTO public.comment VALUES (43, 'Final station tough whether address senior moment buy.', '2025-01-29 13:55:31', 5, 10);
INSERT INTO public.comment VALUES (44, 'Example identify likely view around remember take ground eat determine feeling certainly necessary economy.', '2024-12-17 23:59:48', 23, 14);
INSERT INTO public.comment VALUES (45, 'Discussion star individual third want during nice thing ok.', '2025-01-14 07:56:01', 12, 2);
INSERT INTO public.comment VALUES (46, 'Model similar sometimes talk remember again leave toward current include.', '2025-02-24 16:39:35', 33, 15);
INSERT INTO public.comment VALUES (47, 'Hold his moment billion talk mouth tonight throw action section drug how purpose world.', '2025-02-17 18:10:43', 3, 20);
INSERT INTO public.comment VALUES (48, 'Election baby seven only scientist teach seven approach speak really eat report to.', '2025-04-20 03:49:24', 7, 13);
INSERT INTO public.comment VALUES (49, 'Outside they eye out goal group stop father politics.', '2025-01-30 22:25:44', 13, 9);
INSERT INTO public.comment VALUES (50, 'Against southern very talk part fund feeling cause stand.', '2025-06-12 18:21:18', 23, 16);
INSERT INTO public.comment VALUES (51, 'Give point herself official receive may push serious successful country describe method.', '2025-03-21 16:10:09', 37, 6);
INSERT INTO public.comment VALUES (52, 'Space military tonight sing media step live game item.', '2025-03-11 07:04:44', 14, 2);
INSERT INTO public.comment VALUES (53, 'Appear role why learn attention cut billion eight soldier ability them vote continue community whole.', '2025-02-20 16:29:19', 11, 6);
INSERT INTO public.comment VALUES (54, 'Speech across yard admit parent up story financial state hotel matter guy great old site record.', '2025-05-10 20:29:53', 22, 17);
INSERT INTO public.comment VALUES (55, 'Add mother good decade TV culture continue condition probably.', '2025-04-10 11:54:36', 17, 4);
INSERT INTO public.comment VALUES (56, 'Measure only wait technology town approach today all positive us maybe information forward trouble unit people.', '2025-04-30 10:28:33', 39, 15);
INSERT INTO public.comment VALUES (57, 'Fund catch without prevent ever with participant form.', '2025-06-04 15:47:12', 12, 1);
INSERT INTO public.comment VALUES (58, 'Learn senior today mention next identify language provide.', '2025-04-09 16:02:44', 31, 14);
INSERT INTO public.comment VALUES (59, 'Short rather spend similar both significant stuff section lot rather beyond share energy.', '2025-05-14 03:56:59', 37, 17);
INSERT INTO public.comment VALUES (60, 'Play meeting movie avoid American address simply catch.', '2025-01-05 13:35:42', 20, 12);
INSERT INTO public.comment VALUES (61, 'His within though finish star be hot often worry any include try agree.', '2025-04-08 00:55:18', 25, 9);
INSERT INTO public.comment VALUES (62, 'Car room father identify within street national sea knowledge my night top popular.', '2025-04-05 23:51:00', 10, 18);
INSERT INTO public.comment VALUES (63, 'Store office explain education idea across player appear similar.', '2024-12-26 07:58:54', 1, 15);
INSERT INTO public.comment VALUES (64, 'Police choice cell seven care yet well.', '2024-12-13 22:56:14', 6, 11);
INSERT INTO public.comment VALUES (65, 'Study form seem beat debate late radio like money ball keep since.', '2025-03-27 23:52:23', 3, 18);
INSERT INTO public.comment VALUES (66, 'Necessary million trade century hundred themselves finish these century alone popular break attention environment.', '2025-02-09 11:43:00', 18, 5);
INSERT INTO public.comment VALUES (67, 'Voice thank local option five prove performance mention discussion maybe rise sit.', '2025-02-21 18:36:46', 16, 16);
INSERT INTO public.comment VALUES (68, 'Society according off little happy short during agency meet window now always.', '2025-02-21 17:32:44', 23, 20);
INSERT INTO public.comment VALUES (69, 'Game magazine series think industry specific show pressure local.', '2025-05-02 12:59:28', 19, 12);
INSERT INTO public.comment VALUES (70, 'Raise suggest six claim analysis school moment young close history explain these.', '2025-03-16 15:10:52', 38, 20);
INSERT INTO public.comment VALUES (71, 'Trial religious your outside wish community kid official within nothing.', '2025-05-29 17:25:21', 9, 10);
INSERT INTO public.comment VALUES (72, 'Century involve down herself drive effort drop onto until head lay out perhaps chair during such.', '2025-01-31 13:18:28', 25, 14);
INSERT INTO public.comment VALUES (73, 'Common relate others throw land daughter consider group eat soon must toward family event dark.', '2025-05-25 14:33:11', 6, 1);
INSERT INTO public.comment VALUES (74, 'Firm again court culture story suggest learn economy explain main sport summer sea.', '2025-04-27 15:21:15', 39, 7);
INSERT INTO public.comment VALUES (75, 'Approach trip throughout free civil entire result just nature increase trouble heart watch.', '2024-12-30 02:52:57', 22, 6);
INSERT INTO public.comment VALUES (76, 'Yet so before wrong take old former run.', '2025-04-07 13:27:08', 16, 8);
INSERT INTO public.comment VALUES (77, 'Too dog among believe value fine staff that.', '2025-04-29 12:49:44', 29, 13);
INSERT INTO public.comment VALUES (78, 'Sign office until particularly when thing everyone city contain.', '2025-01-25 14:18:20', 37, 14);
INSERT INTO public.comment VALUES (79, 'Candidate direction many field same even bad together professional.', '2025-01-17 01:09:48', 3, 13);
INSERT INTO public.comment VALUES (80, 'That admit Mrs look call spring establish together record system.', '2025-05-29 23:05:22', 37, 14);
INSERT INTO public.comment VALUES (81, 'Social say about century debate officer about camera machine American five.', '2025-01-24 10:12:55', 3, 6);
INSERT INTO public.comment VALUES (82, 'Lead professional kind wait PM every religious beyond majority.', '2025-02-19 04:20:55', 29, 3);
INSERT INTO public.comment VALUES (83, 'Open executive experience hotel compare box operation prepare might catch that trip century energy safe.', '2025-01-19 14:08:33', 17, 6);
INSERT INTO public.comment VALUES (84, 'School enter wind heavy anything strategy hope return near.', '2025-05-11 15:50:11', 29, 17);
INSERT INTO public.comment VALUES (85, 'Notice prevent figure kitchen seven write decision data wrong best I medical level president allow.', '2025-01-26 22:53:57', 32, 18);
INSERT INTO public.comment VALUES (86, 'Believe her attorney stock defense cup man course teacher message.', '2025-04-08 22:52:56', 39, 1);
INSERT INTO public.comment VALUES (87, 'Nearly mind perform over ten tree pull likely piece small.', '2025-02-18 19:48:19', 3, 16);
INSERT INTO public.comment VALUES (88, 'Woman small reduce alone culture democratic radio stay century law before everybody.', '2025-04-17 17:21:09', 21, 10);
INSERT INTO public.comment VALUES (89, 'Hot scene view today father provide pass step have perform because.', '2025-05-28 22:32:14', 30, 2);
INSERT INTO public.comment VALUES (90, 'Important they tax machine century suddenly have quality break.', '2025-02-13 03:08:42', 27, 7);
INSERT INTO public.comment VALUES (91, 'Raise away tough subject customer far recently prepare scene house central baby.', '2025-04-13 22:26:36', 36, 3);
INSERT INTO public.comment VALUES (92, 'Money store majority choice chance of enter deep walk.', '2025-01-08 18:09:47', 9, 1);
INSERT INTO public.comment VALUES (93, 'Trouble movie view stuff federal like be happen unit big early amount team.', '2025-04-24 10:44:40', 26, 14);
INSERT INTO public.comment VALUES (94, 'Beat start say either none heavy down business state way sister civil market value during difficult.', '2025-04-28 23:42:43', 21, 1);
INSERT INTO public.comment VALUES (95, 'Push the ten will summer specific option concern black believe performance officer election information among avoid.', '2025-05-22 09:27:21', 14, 1);
INSERT INTO public.comment VALUES (96, 'Around four PM hospital against fast drop simply or century their defense floor themselves.', '2025-05-10 07:09:44', 1, 17);
INSERT INTO public.comment VALUES (97, 'Inside mind without represent resource pretty write under fear knowledge player.', '2025-01-27 17:01:53', 40, 4);
INSERT INTO public.comment VALUES (98, 'Tough fill happy last hit poor appear since experience perform interest.', '2025-04-10 09:48:33', 13, 4);
INSERT INTO public.comment VALUES (99, 'Season crime study environment style remain cup they enter identify participant environmental them really debate.', '2025-02-01 12:40:16', 39, 7);
INSERT INTO public.comment VALUES (100, 'Price job follow result court improve use while.', '2025-01-05 18:31:50', 20, 9);


--
-- TOC entry 3399 (class 0 OID 16417)
-- Dependencies: 224
-- Data for Name: idea; Type: TABLE DATA; Schema: public; Owner: demo
--

INSERT INTO public.idea VALUES (1, 'Three own bank recognize.', 'Learn big sing after our car. Black near get himself simply make. Particular level place full.', '2025-01-05 20:23:11', 'Finance', 14);
INSERT INTO public.idea VALUES (2, 'Fast support when hold .', 'Team yet although hot he couple ground. Away and various main too war project occur.', '2025-01-23 15:31:56', 'Tech', 9);
INSERT INTO public.idea VALUES (3, 'Behavior standard thousand.', 'Figure box international not type very indeed. Indeed choose west social. Rather air try while reveal bad.', '2024-12-26 08:45:16', 'Environment', 16);
INSERT INTO public.idea VALUES (4, 'Grow ahead girl act.', 'Audience throw debate daughter purpose voice. Security fall ready usually.', '2025-01-26 22:12:58', 'Finance', 10);
INSERT INTO public.idea VALUES (5, 'Cost both general where.', 'Whom gun list. Fast there network force or.', '2024-12-28 09:35:34', 'Finance', 12);
INSERT INTO public.idea VALUES (6, 'Mouth film heavy chair.', 'Firm drug senior fact information. Technology over hour.', '2025-04-28 01:20:33', 'Environment', 7);
INSERT INTO public.idea VALUES (7, 'Car federal indicate unit.', 'Fear great easy plan PM more. Impact individual rock fly daughter fall. Before control board born painting child reflect. Control instead company where future model.', '2025-02-19 17:07:40', 'Environment', 5);
INSERT INTO public.idea VALUES (8, 'Place beat sense far.', 'Boy without feeling participant interest. Begin marriage which myself if place again.', '2025-02-03 03:39:07', 'Education', 5);
INSERT INTO public.idea VALUES (9, 'A huge three.', 'Bill education exist sense training other. Audience energy move. Morning eat turn clear.', '2025-03-03 06:14:43', 'Tech', 20);
INSERT INTO public.idea VALUES (10, 'Executive care mission.', 'Scientist tough everything kind nothing case. Recent high opportunity cause. Government line indeed live reason.', '2025-02-12 12:06:08', 'Education', 18);
INSERT INTO public.idea VALUES (11, 'Present art feel seat.', 'Thousand act money at term rather. According American per yourself their record. Cell of course its respond.', '2025-02-25 07:10:18', 'Environment', 5);
INSERT INTO public.idea VALUES (12, 'Former possible reach.', 'Firm decade cost glass work interview man. Somebody keep daughter report town.', '2024-12-19 04:05:17', 'Education', 4);
INSERT INTO public.idea VALUES (13, 'Plan that hair sea.', 'Father beautiful than seem sign third in approach. Program possible natural same issue lawyer effort.', '2025-03-15 01:41:48', 'Tech', 11);
INSERT INTO public.idea VALUES (14, 'Front amount apply.', 'As into develop part.', '2025-03-31 00:23:06', 'Finance', 18);
INSERT INTO public.idea VALUES (15, 'Law fund bill third.', 'Lay foot agreement and hard decide modern. Study economy rock feeling might. Effort gas Republican and various authority.', '2025-03-12 05:05:23', 'Tech', 12);
INSERT INTO public.idea VALUES (16, 'Right answer speak without.', 'Increase try key baby. Next though house where economic detail.', '2025-05-24 21:49:06', 'Finance', 11);
INSERT INTO public.idea VALUES (17, 'Various floor itself news.', 'Represent since method left plant. Discussion budget situation between run. Design they young according movement.', '2025-03-05 20:52:35', 'Environment', 7);
INSERT INTO public.idea VALUES (18, 'Business population brother.', 'Director respond national example science top. Million push do pick. Old case administration measure happen.', '2025-04-14 23:27:01', 'Environment', 16);
INSERT INTO public.idea VALUES (19, 'Speech theory choice.', 'Yard career deal trip market should wide. Run staff service government opportunity.', '2025-04-13 20:17:54', 'Finance', 17);
INSERT INTO public.idea VALUES (20, 'Too blue street money.', 'Present produce manager well lose finish summer. Case I course first factor.', '2024-12-24 04:47:44', 'Education', 2);
INSERT INTO public.idea VALUES (21, 'Although risk which gas kid.', 'General class admit of around. Character against physical agency and difficult president at.', '2024-12-24 19:49:39', 'Environment', 1);
INSERT INTO public.idea VALUES (22, 'Will institution throughout.', 'Road size impact act through move. Service north but west commercial may perform.', '2025-04-20 06:01:47', 'Tech', 13);
INSERT INTO public.idea VALUES (23, 'Style record bag down stock.', 'Collection bad until our per leader change. Always future scene heavy personal threat many group.', '2025-04-22 03:05:24', 'Tech', 20);
INSERT INTO public.idea VALUES (24, 'Leader medical class send.', 'Sound war address morning explain. With significant now energy rather lay return. Get anything event yet effect quite.', '2025-04-28 03:51:25', 'Finance', 11);
INSERT INTO public.idea VALUES (25, 'Yet seven several might.', 'Break word source wall drug. Race government trouble tonight former section across.', '2025-05-20 05:30:17', 'Health', 11);
INSERT INTO public.idea VALUES (26, 'North weight guy.', 'Follow situation over would a. Notice kind game act. Travel professional production election partner audience very. Wear community college probably church.', '2025-01-03 01:52:58', 'Tech', 7);
INSERT INTO public.idea VALUES (27, 'Place myself his itsel.', 'Mrs never wrong couple site. Suddenly seek choice produce.', '2025-06-10 01:45:51', 'Environment', 8);
INSERT INTO public.idea VALUES (28, 'His less already treatment.', 'More walk quite piece physical market.', '2025-05-03 15:19:34', 'Health', 5);
INSERT INTO public.idea VALUES (29, 'Number drug continue serve.', 'Door research tell time special beyond could. Type up play wait education think. Particular before air action economy several.', '2025-02-25 18:47:55', 'Environment', 15);
INSERT INTO public.idea VALUES (30, 'Simple personal home they.', 'North everything state huge. Career bank ten guess attorney response provide. Amount up suddenly war fire town worker.', '2025-05-10 04:54:08', 'Tech', 3);
INSERT INTO public.idea VALUES (31, 'Image central challenge.', 'Throughout treat relate respond. Role mind statement.', '2025-04-25 22:10:03', 'Education', 17);
INSERT INTO public.idea VALUES (32, 'Hold conference son.', 'Site military lead travel series. Need although one political almost serious stand. Cover social particularly speech.', '2025-03-24 02:54:59', 'Finance', 4);
INSERT INTO public.idea VALUES (33, 'Remember tree care sign.', 'Bar military able simple billion parent now. Street mention would technology budget first.', '2024-12-17 02:54:14', 'Education', 18);
INSERT INTO public.idea VALUES (34, 'Safe affect though cover.', 'Recognize someone treatment over. Group strong back approach. Page per eight finally support law.', '2025-01-16 18:57:41', 'Education', 4);
INSERT INTO public.idea VALUES (35, 'Law enough we.', 'Benefit ago again identify real to. Lead network the many ball appear.', '2025-05-29 02:42:54', 'Environment', 11);
INSERT INTO public.idea VALUES (36, 'So teach energy possible.', 'Western likely almost training personal expert. A front war. Civil single city quite.', '2025-06-01 08:56:56', 'Environment', 7);
INSERT INTO public.idea VALUES (37, 'Foreign agency when personal.', 'Difficult there leg theory case north. Class on reach.', '2025-05-01 05:17:41', 'Environment', 18);
INSERT INTO public.idea VALUES (38, 'Yourself affect station.', 'Since born particularly.', '2025-05-12 20:15:14', 'Environment', 10);
INSERT INTO public.idea VALUES (39, 'Purpose here ago job.', 'Two hair describe hundred candidate. Probably whom it job likely different house. However ok structure your those head against.', '2025-04-10 11:16:46', 'Finance', 3);
INSERT INTO public.idea VALUES (40, 'Theory everybody.', 'Require agree inside thank.', '2025-02-27 01:00:44', 'Environment', 13);


--
-- TOC entry 3393 (class 0 OID 16388)
-- Dependencies: 218
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: demo
--

INSERT INTO public."user" VALUES (1, 'someone@example.com', 'Fernando Saraiva', '$argon2id$v=19$m=65536,t=3,p=4$J9XUSn7e4vSqO7/LBjeVTw$v/iH35tTgRzC/6t4fAgrSO5xarfBRCX7wonG0Q7scfg');
INSERT INTO public."user" VALUES (2, 'user2@example.com', 'Benjamin Jefferson', '^BZ3SKQ%t7Rd');
INSERT INTO public."user" VALUES (3, 'user3@example.com', 'Sean Sanchez MD', '5xlShBPv@3eS');
INSERT INTO public."user" VALUES (4, 'user4@example.com', 'Kyle Cruz', '21XaN&fq)o3J');
INSERT INTO public."user" VALUES (5, 'user5@example.com', 'Kelly Young', '89Z$sEC(VC2N');
INSERT INTO public."user" VALUES (6, 'user6@example.com', 'Christopher Simmons', '!1mZvW^)1e(&');
INSERT INTO public."user" VALUES (7, 'user7@example.com', 'Cathy Martinez', 'SXn^0VKaMWd$');
INSERT INTO public."user" VALUES (8, 'user8@example.com', 'Tamara Jackson', 'k++R3Yb!cs_t');
INSERT INTO public."user" VALUES (9, 'user9@example.com', 'Michael Ellis', '@5iNXbVspbXh');
INSERT INTO public."user" VALUES (10, 'user10@example.com', 'George Allen', 'MUIHdIbw_7+R');
INSERT INTO public."user" VALUES (11, 'user11@example.com', 'Kathleen Collins', 'Izxyn)@w*0Zh');
INSERT INTO public."user" VALUES (12, 'user12@example.com', 'Lee Gonzalez', '%p4WfLkp)QaD');
INSERT INTO public."user" VALUES (13, 'user13@example.com', 'Kristin Potts', 'W)ZLKX1F9w80');
INSERT INTO public."user" VALUES (14, 'user14@example.com', 'Derrick Hernandez', 'z4(gvLpm)nA(');
INSERT INTO public."user" VALUES (15, 'user15@example.com', 'Michael Simmons', 'suYFXZ%v%5!H');
INSERT INTO public."user" VALUES (16, 'user16@example.com', 'Claudia Miller', '0y4Sp#Qh2$6Z');
INSERT INTO public."user" VALUES (17, 'user17@example.com', 'James Payne', '#IcTOpBOOb21');
INSERT INTO public."user" VALUES (18, 'user18@example.com', 'Stephanie Meyers', 'W+!9eElit%8A');
INSERT INTO public."user" VALUES (19, 'user19@example.com', 'Jacob Reyes', '(kQB^Js9s8xo');
INSERT INTO public."user" VALUES (20, 'user20@example.com', 'April White', '(p9AIlIk)9n%');


--
-- TOC entry 3395 (class 0 OID 16399)
-- Dependencies: 220
-- Data for Name: votes; Type: TABLE DATA; Schema: public; Owner: demo
--

INSERT INTO public.votes VALUES (1, true, '2025-01-30 05:54:35', 12, 16);
INSERT INTO public.votes VALUES (2, true, '2025-02-20 03:01:14', 26, 1);
INSERT INTO public.votes VALUES (3, false, '2025-05-09 12:20:36', 18, 4);
INSERT INTO public.votes VALUES (4, true, '2025-05-01 17:11:43', 17, 17);
INSERT INTO public.votes VALUES (5, true, '2025-06-07 19:48:36', 23, 5);
INSERT INTO public.votes VALUES (6, true, '2025-03-14 10:26:25', 18, 2);
INSERT INTO public.votes VALUES (7, true, '2025-03-08 10:05:58', 3, 9);
INSERT INTO public.votes VALUES (8, false, '2025-01-15 10:48:17', 36, 12);
INSERT INTO public.votes VALUES (9, true, '2025-04-25 03:39:54', 37, 20);
INSERT INTO public.votes VALUES (10, false, '2025-05-24 09:36:34', 32, 14);
INSERT INTO public.votes VALUES (11, true, '2025-02-19 10:55:49', 24, 7);
INSERT INTO public.votes VALUES (12, false, '2025-03-05 18:09:51', 25, 1);
INSERT INTO public.votes VALUES (13, true, '2025-05-26 13:57:37', 9, 9);
INSERT INTO public.votes VALUES (14, false, '2025-03-07 10:35:00', 22, 12);
INSERT INTO public.votes VALUES (15, false, '2025-03-02 08:21:26', 6, 20);
INSERT INTO public.votes VALUES (16, true, '2025-02-21 12:17:52', 3, 9);
INSERT INTO public.votes VALUES (17, true, '2025-04-05 02:59:44', 11, 19);
INSERT INTO public.votes VALUES (18, false, '2025-01-02 04:58:35', 19, 13);
INSERT INTO public.votes VALUES (19, true, '2024-12-29 18:09:33', 36, 10);
INSERT INTO public.votes VALUES (20, false, '2025-03-30 23:46:23', 8, 8);
INSERT INTO public.votes VALUES (21, false, '2025-05-17 04:58:28', 4, 6);
INSERT INTO public.votes VALUES (22, true, '2025-03-10 15:20:14', 34, 10);
INSERT INTO public.votes VALUES (23, false, '2025-01-07 03:35:07', 26, 10);
INSERT INTO public.votes VALUES (24, true, '2024-12-31 08:40:07', 27, 4);
INSERT INTO public.votes VALUES (25, false, '2024-12-15 17:28:40', 36, 16);
INSERT INTO public.votes VALUES (26, false, '2025-05-17 18:27:37', 22, 4);
INSERT INTO public.votes VALUES (27, true, '2025-03-24 15:12:19', 31, 16);
INSERT INTO public.votes VALUES (28, true, '2025-05-28 10:59:39', 28, 10);
INSERT INTO public.votes VALUES (29, true, '2025-04-27 18:55:11', 22, 6);
INSERT INTO public.votes VALUES (30, false, '2025-02-25 17:04:52', 37, 3);
INSERT INTO public.votes VALUES (31, true, '2025-04-18 19:34:10', 5, 7);
INSERT INTO public.votes VALUES (32, true, '2025-03-15 21:58:58', 15, 13);
INSERT INTO public.votes VALUES (33, true, '2025-01-27 19:33:45', 1, 13);
INSERT INTO public.votes VALUES (34, false, '2025-02-27 01:56:15', 36, 15);
INSERT INTO public.votes VALUES (35, true, '2025-04-15 09:57:36', 32, 14);
INSERT INTO public.votes VALUES (36, false, '2025-05-01 16:16:19', 6, 8);
INSERT INTO public.votes VALUES (37, true, '2024-12-31 11:19:06', 17, 14);
INSERT INTO public.votes VALUES (38, false, '2025-03-04 14:59:28', 13, 4);
INSERT INTO public.votes VALUES (39, true, '2024-12-23 19:58:43', 5, 17);
INSERT INTO public.votes VALUES (40, true, '2025-04-22 20:10:46', 29, 4);
INSERT INTO public.votes VALUES (41, false, '2025-05-24 23:56:08', 32, 9);
INSERT INTO public.votes VALUES (42, true, '2025-02-08 05:59:45', 14, 7);
INSERT INTO public.votes VALUES (43, true, '2025-04-08 08:50:34', 40, 4);
INSERT INTO public.votes VALUES (44, false, '2025-01-14 19:12:10', 13, 13);
INSERT INTO public.votes VALUES (45, true, '2025-02-09 05:29:36', 24, 4);
INSERT INTO public.votes VALUES (46, false, '2025-02-04 19:10:57', 39, 5);
INSERT INTO public.votes VALUES (47, false, '2025-03-25 00:14:45', 37, 14);
INSERT INTO public.votes VALUES (48, false, '2025-01-05 20:50:54', 34, 11);
INSERT INTO public.votes VALUES (49, false, '2025-03-31 01:00:34', 32, 7);
INSERT INTO public.votes VALUES (50, true, '2025-04-21 13:45:56', 35, 1);
INSERT INTO public.votes VALUES (51, false, '2025-04-23 07:40:16', 22, 11);
INSERT INTO public.votes VALUES (52, true, '2025-02-16 05:17:14', 3, 9);
INSERT INTO public.votes VALUES (53, true, '2024-12-12 17:37:16', 39, 13);
INSERT INTO public.votes VALUES (54, false, '2025-01-09 18:10:25', 38, 16);
INSERT INTO public.votes VALUES (55, true, '2024-12-13 00:05:09', 5, 17);
INSERT INTO public.votes VALUES (56, true, '2024-12-30 19:11:54', 3, 8);
INSERT INTO public.votes VALUES (57, true, '2025-02-16 14:15:48', 9, 10);
INSERT INTO public.votes VALUES (58, false, '2025-05-07 22:37:51', 1, 11);
INSERT INTO public.votes VALUES (59, true, '2025-02-16 06:57:54', 11, 15);
INSERT INTO public.votes VALUES (60, false, '2025-03-10 13:01:41', 24, 17);
INSERT INTO public.votes VALUES (61, true, '2025-05-26 03:45:33', 33, 19);
INSERT INTO public.votes VALUES (62, true, '2025-01-20 05:35:26', 6, 14);
INSERT INTO public.votes VALUES (63, false, '2025-01-28 20:20:40', 14, 18);
INSERT INTO public.votes VALUES (64, false, '2025-02-23 10:13:37', 39, 16);
INSERT INTO public.votes VALUES (65, true, '2025-06-01 21:13:30', 25, 1);
INSERT INTO public.votes VALUES (66, true, '2025-04-21 16:52:48', 1, 10);
INSERT INTO public.votes VALUES (67, false, '2025-04-02 16:22:22', 33, 11);
INSERT INTO public.votes VALUES (68, false, '2025-03-12 06:27:19', 5, 9);
INSERT INTO public.votes VALUES (69, false, '2025-02-01 11:48:08', 20, 13);
INSERT INTO public.votes VALUES (70, true, '2025-03-28 16:52:59', 25, 6);
INSERT INTO public.votes VALUES (71, true, '2025-01-14 22:52:46', 9, 10);
INSERT INTO public.votes VALUES (72, true, '2025-06-12 18:13:02', 22, 2);
INSERT INTO public.votes VALUES (73, false, '2025-03-10 00:52:05', 31, 5);
INSERT INTO public.votes VALUES (74, true, '2025-02-28 10:38:12', 32, 5);
INSERT INTO public.votes VALUES (75, false, '2024-12-15 14:13:15', 23, 2);
INSERT INTO public.votes VALUES (76, false, '2025-01-01 18:11:37', 40, 13);
INSERT INTO public.votes VALUES (77, true, '2024-12-13 15:03:43', 30, 4);
INSERT INTO public.votes VALUES (78, true, '2025-01-02 12:17:48', 31, 1);
INSERT INTO public.votes VALUES (79, true, '2025-02-14 17:10:57', 3, 11);
INSERT INTO public.votes VALUES (80, false, '2025-05-02 10:25:23', 7, 7);
INSERT INTO public.votes VALUES (81, false, '2025-01-22 01:03:43', 25, 4);
INSERT INTO public.votes VALUES (82, false, '2025-02-11 09:12:33', 4, 20);
INSERT INTO public.votes VALUES (83, true, '2025-03-28 11:49:19', 22, 20);
INSERT INTO public.votes VALUES (84, true, '2025-01-04 01:06:42', 19, 13);
INSERT INTO public.votes VALUES (85, true, '2025-03-19 23:55:12', 19, 17);
INSERT INTO public.votes VALUES (86, true, '2025-05-12 19:34:57', 13, 13);
INSERT INTO public.votes VALUES (87, false, '2025-02-09 04:52:06', 29, 7);
INSERT INTO public.votes VALUES (88, false, '2025-06-03 07:11:41', 30, 3);
INSERT INTO public.votes VALUES (89, true, '2024-12-30 16:11:12', 3, 16);
INSERT INTO public.votes VALUES (90, true, '2025-01-01 14:00:46', 17, 17);
INSERT INTO public.votes VALUES (91, true, '2025-03-28 11:45:11', 37, 8);
INSERT INTO public.votes VALUES (92, false, '2025-04-11 10:09:29', 6, 17);
INSERT INTO public.votes VALUES (93, true, '2025-02-06 18:23:09', 20, 5);
INSERT INTO public.votes VALUES (94, false, '2025-05-05 11:55:17', 28, 3);
INSERT INTO public.votes VALUES (95, false, '2024-12-24 12:55:52', 7, 3);
INSERT INTO public.votes VALUES (96, false, '2025-01-29 10:40:04', 7, 5);
INSERT INTO public.votes VALUES (97, false, '2025-06-09 13:24:25', 2, 14);
INSERT INTO public.votes VALUES (98, true, '2025-05-24 04:09:18', 27, 16);
INSERT INTO public.votes VALUES (99, false, '2025-01-03 07:31:18', 21, 3);
INSERT INTO public.votes VALUES (100, true, '2025-04-24 12:43:28', 23, 4);
INSERT INTO public.votes VALUES (101, true, '2025-01-13 15:51:27', 23, 12);
INSERT INTO public.votes VALUES (102, true, '2025-03-09 00:50:27', 23, 1);
INSERT INTO public.votes VALUES (103, false, '2025-01-13 20:37:35', 15, 3);
INSERT INTO public.votes VALUES (104, true, '2025-01-13 21:17:10', 39, 7);
INSERT INTO public.votes VALUES (105, true, '2025-03-13 01:10:34', 1, 4);
INSERT INTO public.votes VALUES (106, false, '2025-01-31 18:35:00', 1, 12);
INSERT INTO public.votes VALUES (107, true, '2025-06-06 07:01:53', 2, 5);
INSERT INTO public.votes VALUES (108, false, '2025-05-22 18:35:50', 12, 4);
INSERT INTO public.votes VALUES (109, false, '2025-04-26 12:34:21', 31, 9);
INSERT INTO public.votes VALUES (110, true, '2025-01-14 07:02:12', 9, 7);
INSERT INTO public.votes VALUES (111, false, '2025-03-08 02:52:41', 24, 16);
INSERT INTO public.votes VALUES (112, false, '2025-04-28 12:49:29', 19, 18);
INSERT INTO public.votes VALUES (113, true, '2025-05-23 05:12:34', 21, 19);
INSERT INTO public.votes VALUES (114, true, '2025-04-02 13:46:51', 6, 18);
INSERT INTO public.votes VALUES (115, false, '2024-12-18 00:00:17', 38, 6);
INSERT INTO public.votes VALUES (116, true, '2025-03-31 14:07:50', 25, 5);
INSERT INTO public.votes VALUES (117, false, '2025-02-24 04:59:41', 15, 17);
INSERT INTO public.votes VALUES (118, true, '2024-12-15 21:06:23', 16, 6);
INSERT INTO public.votes VALUES (119, false, '2025-01-05 12:49:30', 19, 14);
INSERT INTO public.votes VALUES (120, true, '2025-01-01 05:06:01', 3, 20);
INSERT INTO public.votes VALUES (121, false, '2025-02-10 20:47:22', 2, 3);
INSERT INTO public.votes VALUES (122, true, '2024-12-28 19:10:17', 5, 14);
INSERT INTO public.votes VALUES (123, false, '2025-04-14 02:32:33', 20, 5);
INSERT INTO public.votes VALUES (124, false, '2025-05-10 22:36:10', 38, 10);
INSERT INTO public.votes VALUES (125, true, '2025-02-24 18:36:48', 23, 8);
INSERT INTO public.votes VALUES (126, false, '2025-01-22 05:25:21', 29, 17);
INSERT INTO public.votes VALUES (127, false, '2025-01-31 12:20:03', 4, 14);
INSERT INTO public.votes VALUES (128, false, '2025-05-02 03:46:21', 1, 11);
INSERT INTO public.votes VALUES (129, true, '2025-02-25 05:49:24', 29, 12);
INSERT INTO public.votes VALUES (130, false, '2025-01-26 06:40:09', 19, 3);
INSERT INTO public.votes VALUES (131, true, '2025-03-12 15:16:17', 12, 9);
INSERT INTO public.votes VALUES (132, true, '2025-04-16 23:31:49', 8, 15);
INSERT INTO public.votes VALUES (133, true, '2025-04-07 03:57:14', 26, 14);
INSERT INTO public.votes VALUES (134, true, '2025-03-20 16:58:09', 28, 8);
INSERT INTO public.votes VALUES (135, false, '2025-03-31 09:36:27', 30, 17);
INSERT INTO public.votes VALUES (136, false, '2025-05-24 05:25:14', 10, 15);
INSERT INTO public.votes VALUES (137, false, '2025-02-22 04:05:01', 6, 7);
INSERT INTO public.votes VALUES (138, true, '2025-01-17 22:29:13', 19, 15);
INSERT INTO public.votes VALUES (139, false, '2025-03-05 07:47:36', 40, 1);
INSERT INTO public.votes VALUES (140, false, '2025-04-15 22:40:08', 14, 4);
INSERT INTO public.votes VALUES (141, true, '2025-05-18 06:20:34', 20, 14);
INSERT INTO public.votes VALUES (142, true, '2024-12-14 07:59:43', 31, 16);
INSERT INTO public.votes VALUES (143, false, '2025-04-06 02:00:21', 15, 9);
INSERT INTO public.votes VALUES (144, true, '2025-03-04 10:39:36', 2, 9);
INSERT INTO public.votes VALUES (145, true, '2025-04-08 16:43:35', 3, 9);
INSERT INTO public.votes VALUES (146, false, '2025-01-27 02:08:37', 26, 15);
INSERT INTO public.votes VALUES (147, false, '2025-02-05 17:13:32', 7, 12);
INSERT INTO public.votes VALUES (148, true, '2025-02-18 01:15:38', 19, 20);
INSERT INTO public.votes VALUES (149, true, '2025-03-22 08:17:14', 6, 3);
INSERT INTO public.votes VALUES (150, false, '2025-02-11 15:35:59', 17, 18);


--
-- TOC entry 3409 (class 0 OID 0)
-- Dependencies: 221
-- Name: comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: demo
--

SELECT pg_catalog.setval('public.comment_id_seq', 1, false);


--
-- TOC entry 3410 (class 0 OID 0)
-- Dependencies: 223
-- Name: idea_id_seq; Type: SEQUENCE SET; Schema: public; Owner: demo
--

SELECT pg_catalog.setval('public.idea_id_seq', 1, false);


--
-- TOC entry 3411 (class 0 OID 0)
-- Dependencies: 217
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: demo
--

SELECT pg_catalog.setval('public.user_id_seq', 1, true);

--
-- TOC entry 3412 (class 0 OID 0)
-- Dependencies: 219
-- Name: votes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: demo
--

SELECT pg_catalog.setval('public.votes_id_seq', 1, false);


--
-- TOC entry 3239 (class 2606 OID 16415)
-- Name: comment PK_0b0e4bbc8415ec426f87f3a88e2; Type: CONSTRAINT; Schema: public; Owner: demo
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY (id);


--
-- TOC entry 3241 (class 2606 OID 16425)
-- Name: idea PK_5096f543c484b349f5234da9d97; Type: CONSTRAINT; Schema: public; Owner: demo
--

ALTER TABLE ONLY public.idea
    ADD CONSTRAINT "PK_5096f543c484b349f5234da9d97" PRIMARY KEY (id);


--
-- TOC entry 3233 (class 2606 OID 16395)
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: demo
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- TOC entry 3237 (class 2606 OID 16405)
-- Name: votes PK_f3d9fd4a0af865152c3f59db8ff; Type: CONSTRAINT; Schema: public; Owner: demo
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY (id);


--
-- TOC entry 3235 (class 2606 OID 16397)
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: demo
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- TOC entry 3242 (class 2606 OID 16426)
-- Name: votes FK_23cb3ba5b4de4e2c55adc369d45; Type: FK CONSTRAINT; Schema: public; Owner: demo
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT "FK_23cb3ba5b4de4e2c55adc369d45" FOREIGN KEY ("ideaId") REFERENCES public.idea(id);


--
-- TOC entry 3243 (class 2606 OID 16431)
-- Name: votes FK_5169384e31d0989699a318f3ca4; Type: FK CONSTRAINT; Schema: public; Owner: demo
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT "FK_5169384e31d0989699a318f3ca4" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- TOC entry 3246 (class 2606 OID 16446)
-- Name: idea FK_67530863c810fc8fd60c3d59b4e; Type: FK CONSTRAINT; Schema: public; Owner: demo
--

ALTER TABLE ONLY public.idea
    ADD CONSTRAINT "FK_67530863c810fc8fd60c3d59b4e" FOREIGN KEY ("authorId") REFERENCES public."user"(id);


--
-- TOC entry 3244 (class 2606 OID 16436)
-- Name: comment FK_861b419cce1c9ae64295300d6b6; Type: FK CONSTRAINT; Schema: public; Owner: demo
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "FK_861b419cce1c9ae64295300d6b6" FOREIGN KEY ("ideaId") REFERENCES public.idea(id);


--
-- TOC entry 3245 (class 2606 OID 16441)
-- Name: comment FK_c0354a9a009d3bb45a08655ce3b; Type: FK CONSTRAINT; Schema: public; Owner: demo
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES public."user"(id);


-- Completed on 2025-06-13 07:28:24 -03


create DATABASE test_idea;
create DATABASE test_user;

