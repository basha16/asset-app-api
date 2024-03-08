BEGIN;

 
CREATE TABLE IF NOT EXISTS public."user"
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    first_name character varying(44)  NOT NULL,
    last_name character varying(44),
    email character varying(100)  NOT NULL,
    "position" character varying(60)  NOT NULL,
    password character varying(60) NOT NULL,
    team character varying(60) ,
    created_at date,
    updated_at date,
    CONSTRAINT user_pkey PRIMARY KEY (id)
)

    CREATE TYPE asset_status AS ENUM (
        'active',
        'returned',
        'damaged'
    );
    
    CREATE TABLE public.user_assets (
            id uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(455),
            quantity INT NOT NULL DEFAULT 0,
            assignee uuid NOT NULL,
            status asset_status DEFAULT 'active' NOT NULL,
            created_at DATE,
            updated DATE,
            FOREIGN KEY (assignee) REFERENCES public.user(id)
        );
COMMIT;