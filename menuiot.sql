--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: adminAccount; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."adminAccount" (
    id integer NOT NULL,
    ten text NOT NULL,
    mat_khau text NOT NULL
);


ALTER TABLE public."adminAccount" OWNER TO postgres;

--
-- Name: adminAccount_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."adminAccount_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."adminAccount_id_seq" OWNER TO postgres;

--
-- Name: adminAccount_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."adminAccount_id_seq" OWNED BY public."adminAccount".id;


--
-- Name: menu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menu (
    id integer NOT NULL,
    ten_mon text NOT NULL,
    gia integer NOT NULL,
    danh_muc text NOT NULL
);


ALTER TABLE public.menu OWNER TO postgres;

--
-- Name: menu_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.menu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.menu_id_seq OWNER TO postgres;

--
-- Name: menu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.menu_id_seq OWNED BY public.menu.id;


--
-- Name: adminAccount id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."adminAccount" ALTER COLUMN id SET DEFAULT nextval('public."adminAccount_id_seq"'::regclass);


--
-- Name: menu id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu ALTER COLUMN id SET DEFAULT nextval('public.menu_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
9f0d804d-2177-4d26-9e74-779d71a317bd	08510e64b76ac49208b55b03ef607222bf07b7729c91aadd750238f1a3a9d824	2025-07-08 09:27:50.350879+07	20250708022750_init	\N	\N	2025-07-08 09:27:50.33289+07	1
\.


--
-- Data for Name: adminAccount; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."adminAccount" (id, ten, mat_khau) FROM stdin;
1	Tuan	Tuan2207
2	IoT	123
\.


--
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.menu (id, ten_mon, gia, danh_muc) FROM stdin;
8	IoT Apartment Hotel (Not including cars) 	2700000	IoT Apartment Hotel
11	Sâm Ngọc Linh mật ong (size M)	2500000	Sâm Ngọc Linh
12	Sâm Ngọc Linh mật ong (size L)	4300000	Sâm Ngọc Linh
14	Revive chanh muối 	13000	Đồ uống
23	Hiii	35000	Đồ uống
\.


--
-- Name: adminAccount_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."adminAccount_id_seq"', 2, true);


--
-- Name: menu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.menu_id_seq', 23, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: adminAccount adminAccount_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."adminAccount"
    ADD CONSTRAINT "adminAccount_pkey" PRIMARY KEY (id);


--
-- Name: menu menu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

