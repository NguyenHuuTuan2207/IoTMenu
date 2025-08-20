--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

-- Started on 2025-08-19 10:00:09

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
-- TOC entry 5 (class 2615 OID 17049)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 4870 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 17050)
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
-- TOC entry 219 (class 1259 OID 17089)
-- Name: adminAccount; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."adminAccount" (
    id integer NOT NULL,
    ten text NOT NULL,
    mat_khau text NOT NULL
);


ALTER TABLE public."adminAccount" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 17088)
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
-- TOC entry 4872 (class 0 OID 0)
-- Dependencies: 218
-- Name: adminAccount_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."adminAccount_id_seq" OWNED BY public."adminAccount".id;


--
-- TOC entry 217 (class 1259 OID 17060)
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
-- TOC entry 221 (class 1259 OID 17098)
-- Name: menuCoDong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."menuCoDong" (
    id integer NOT NULL,
    ten_mon text NOT NULL,
    gia integer NOT NULL,
    danh_muc text NOT NULL
);


ALTER TABLE public."menuCoDong" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 17097)
-- Name: menuCoDong_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."menuCoDong_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."menuCoDong_id_seq" OWNER TO postgres;

--
-- TOC entry 4873 (class 0 OID 0)
-- Dependencies: 220
-- Name: menuCoDong_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."menuCoDong_id_seq" OWNED BY public."menuCoDong".id;


--
-- TOC entry 216 (class 1259 OID 17059)
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
-- TOC entry 4874 (class 0 OID 0)
-- Dependencies: 216
-- Name: menu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.menu_id_seq OWNED BY public.menu.id;


--
-- TOC entry 4705 (class 2604 OID 17092)
-- Name: adminAccount id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."adminAccount" ALTER COLUMN id SET DEFAULT nextval('public."adminAccount_id_seq"'::regclass);


--
-- TOC entry 4704 (class 2604 OID 17063)
-- Name: menu id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu ALTER COLUMN id SET DEFAULT nextval('public.menu_id_seq'::regclass);


--
-- TOC entry 4706 (class 2604 OID 17101)
-- Name: menuCoDong id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."menuCoDong" ALTER COLUMN id SET DEFAULT nextval('public."menuCoDong_id_seq"'::regclass);


--
-- TOC entry 4858 (class 0 OID 17050)
-- Dependencies: 215
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
1988e067-e30c-4e30-87df-16f156ba84fa	08510e64b76ac49208b55b03ef607222bf07b7729c91aadd750238f1a3a9d824	2025-08-12 09:25:37.586849+07	20250708022750_init	\N	\N	2025-08-12 09:25:37.572583+07	1
b4f1cd86-a4cb-4db2-a3ff-dae7b9f5e750	9329a357711a805146739acd0f5e15038fa10e866f90c34afb27e78d34746fb2	2025-08-12 09:25:58.0627+07	20250812022558_add	\N	\N	2025-08-12 09:25:58.037184+07	1
\.


--
-- TOC entry 4862 (class 0 OID 17089)
-- Dependencies: 219
-- Data for Name: adminAccount; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."adminAccount" (id, ten, mat_khau) FROM stdin;
1	IoT	123
\.


--
-- TOC entry 4860 (class 0 OID 17060)
-- Dependencies: 217
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.menu (id, ten_mon, gia, danh_muc) FROM stdin;
1	Bạc xỉu	20000	Đồ uống
2	test	10000	Đồ uống
4	IoT Apartments & Hotel	2700000	IoT Apartment & Hotel
\.


--
-- TOC entry 4864 (class 0 OID 17098)
-- Dependencies: 221
-- Data for Name: menuCoDong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."menuCoDong" (id, ten_mon, gia, danh_muc) FROM stdin;
1	Revive	1000000	Đồ uống
2	IoT Apartment & Hotel	2700000	IoT Apartment & Hotel
\.


--
-- TOC entry 4875 (class 0 OID 0)
-- Dependencies: 218
-- Name: adminAccount_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."adminAccount_id_seq"', 1, true);


--
-- TOC entry 4876 (class 0 OID 0)
-- Dependencies: 220
-- Name: menuCoDong_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."menuCoDong_id_seq"', 2, true);


--
-- TOC entry 4877 (class 0 OID 0)
-- Dependencies: 216
-- Name: menu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.menu_id_seq', 4, true);


--
-- TOC entry 4708 (class 2606 OID 17058)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4712 (class 2606 OID 17096)
-- Name: adminAccount adminAccount_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."adminAccount"
    ADD CONSTRAINT "adminAccount_pkey" PRIMARY KEY (id);


--
-- TOC entry 4714 (class 2606 OID 17105)
-- Name: menuCoDong menuCoDong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."menuCoDong"
    ADD CONSTRAINT "menuCoDong_pkey" PRIMARY KEY (id);


--
-- TOC entry 4710 (class 2606 OID 17067)
-- Name: menu menu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id);


--
-- TOC entry 4871 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2025-08-19 10:00:09

--
-- PostgreSQL database dump complete
--

