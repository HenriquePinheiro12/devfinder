export default function Global() {
    return (
        <style global jsx>{`
            @import url(https://fonts.googleapis.com/css?family=Ubuntu+Mono:regular,italic,700,700italic);

            :root{
                --fs1: 24px;
                --fs2: 16px;
                --fs3: 14px;

                --fw1: 700;
                --fw2: regular;

                --spc1: .5rem;
                --spc2: 1rem;
                --spc3: 1.5rem;

                --brd-radius: 16px;
                --bxs:0px 0px 10px 2px rgba(0,0,0,0.2); 
            }

            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: "Ubuntu Mono";
                transition: .2s ease;
            }

            main{
                background: var(--very-dark-blue);
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }
        `}</style>
    )
}