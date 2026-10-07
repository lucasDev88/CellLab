import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Atom,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  GraduationCap,
  Layers3,
  Lightbulb,
  Microscope,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import CellVisual, { OrganelleIcon } from "./components/CellVisual";
import {
  cells,
  organelles,
  getQuestions,
  team,
  teacher,
  type CellType,
  type Question,
} from "./data/content";
type Page = "home" | "play" | "atlas" | "compare" | "about";
type Game = {
  type: CellType;
  added: string[];
  rejected: string[];
  score: number;
  correct: number;
  wrong: number;
  quizCorrect: number;
  phase: "build" | "challenge" | "quiz" | "result";
  index: number;
  answer: string | null;
  questions: Question[];
};
const getOrg = (id: string) => organelles.find((o) => o.id === id)!;
const cellName = (type: CellType) => cells.find((c) => c.id === type)!.name;
function readBest() {
  try {
    return Number(localStorage.getItem("celllab-best")) || 0;
  } catch {
    return 0;
  }
}
function App() {
  const [page, setPage] = useState<Page>("home");
  const [game, setGame] = useState<Game | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    ok: boolean;
    text: string;
  } | null>(null);
  const [filter, setFilter] = useState<CellType | "all">("all");
  const [best, setBest] = useState(readBest);
  const dialogClose = useRef<HTMLButtonElement>(null);
  function navigate(next: Page) {
    setPage(next);
    setInfo(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  useEffect(() => {
    if (!info) return;
    const previous = document.activeElement as HTMLElement;
    dialogClose.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInfo(null);
      if (e.key === "Tab") {
        e.preventDefault();
        dialogClose.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
      previous?.focus();
    };
  }, [info]);
  useEffect(() => {
    if (game?.phase === "result") {
      setBest((previous) => {
        const next = Math.max(previous, game.score);
        try {
          localStorage.setItem("celllab-best", String(next));
        } catch {
          /* Storage can be unavailable. */
        }
        return next;
      });
    }
  }, [game?.phase, game?.score]);
  function start(type: CellType) {
    setGame({
      type,
      added: [],
      rejected: [],
      score: 0,
      correct: 0,
      wrong: 0,
      quizCorrect: 0,
      phase: "build",
      index: 0,
      answer: null,
      questions: [],
    });
    setFeedback(null);
    navigate("play");
  }
  function add(id: string) {
    if (
      !game ||
      game.phase !== "build" ||
      game.added.includes(id) ||
      game.rejected.includes(id)
    )
      return;
    const o = organelles.find((o) => o.id === id);
    if (!o) return;
    const ok = o.cellTypes.includes(game.type);
    setFeedback({
      ok,
      text: ok
        ? `${o.name}: ${o.description}`
        : `${o.name}: essa estrutura não pertence ao modelo de ${cellName(game.type).toLowerCase()}.`,
    });
    setGame((g) => {
      if (
        !g ||
        g.phase !== "build" ||
        g.added.includes(id) ||
        g.rejected.includes(id)
      )
        return g;
      return {
        ...g,
        added: ok ? [...g.added, id] : g.added,
        rejected: ok ? g.rejected : [...g.rejected, id],
        score: Math.max(0, g.score + (ok ? 100 : -25)),
        correct: g.correct + (ok ? 1 : 0),
        wrong: g.wrong + (ok ? 0 : 1),
      };
    });
  }
  function answer(id: string) {
    setGame((g) => {
      if (!g || g.answer !== null || !["quiz", "challenge"].includes(g.phase))
        return g;
      const ok = g.questions[g.index].answer === id;
      return {
        ...g,
        answer: id,
        score: Math.max(0, g.score + (ok ? 100 : -25)),
        correct: g.correct + Number(ok),
        wrong: g.wrong + Number(!ok),
        quizCorrect: g.quizCorrect + Number(ok && g.phase === "quiz"),
      };
    });
  }
  function next() {
    setGame((g) => {
      if (!g || g.answer === null) return g;
      if (g.index < g.questions.length - 1)
        return { ...g, index: g.index + 1, answer: null };
      if (g.phase === "challenge")
        return {
          ...g,
          phase: "quiz",
          questions: getQuestions(g.type, "quiz"),
          index: 0,
          answer: null,
        };
      return { ...g, phase: "result" };
    });
  }
  const required = game
    ? organelles.filter((o) => o.cellTypes.includes(game.type))
    : [];
  return (
    <>
      <header className="navbar">
        <a
          href="#"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            navigate("home");
          }}
        >
          <span className="brand-symbol">
            <Atom size={25} />
          </span>
          Cell<span>Lab</span>
          <span className="brand-divider" />
          <small>LABORATÓRIO VIRTUAL</small>
        </a>
        <nav aria-label="Navegação principal">
          {(
            [
              ["home", "Início"],
              ["play", "Jogar"],
              ["atlas", "Atlas Celular"],
              ["compare", "Comparar"],
            ] as [Page, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              className={page === id ? "active" : ""}
              onClick={() => navigate(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        <button className="about-link" onClick={() => navigate("about")}>
          <GraduationCap size={17} /> Sobre o projeto
        </button>
      </header>
      <main key={page} className="page-enter">
        {page === "home" && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <span className="eyebrow">
                  <span className="status-dot" /> CIÊNCIA QUE VOCÊ PODE EXPLORAR
                </span>
                <h1>
                  Uma pequena célula.
                  <br />
                  Um <em>universo</em>
                  <br />
                  para descobrir.
                </h1>
                <h2>Monte. Explore. Entenda a célula.</h2>
                <p>
                  Explore o interior das células, conheça suas organelas e
                  descubra como cada estrutura mantém a vida funcionando.
                </p>
                <div className="hero-actions">
                  <button className="primary" onClick={() => navigate("play")}>
                    <FlaskConical size={19} /> Iniciar Experimento{" "}
                    <ArrowRight size={18} />
                  </button>
                  <button
                    className="secondary"
                    onClick={() => navigate("atlas")}
                  >
                    Explorar Organelas <ArrowUpRight size={17} />
                  </button>
                </div>
                <div className="hero-note">
                  <span className="tiny-icons">
                    <Atom size={17} />
                    <Microscope size={17} />
                    <Sparkles size={17} />
                  </span>{" "}
                  Aprenda fazendo. Uma descoberta por vez.
                </div>
              </div>
              <div className="hero-art">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <span className="specimen-id">AMOSTRA 001 / EUCARIONTE</span>
                <CellVisual decorative />
                <span className="specimen-label nucleus-label">
                  <i /> Núcleo <span>O centro de comando</span>
                </span>
                <span className="specimen-label mitochondria-label">
                  <i /> Mitocôndria <span>Energia para a vida</span>
                </span>
                <div className="art-caption">
                  <span className="status-dot" /> Um mundo invisível. Agora ao
                  seu alcance.<span>40×</span>
                </div>
              </div>
            </section>
            <section className="feature-strip">
              <div>
                <span className="feature-icon">
                  <Layers3 />
                </span>
                <span>
                  <strong>3 tipos de células</strong>
                  <small>Diferentes formas de existir</small>
                </span>
              </div>
              <div>
                <span className="feature-icon purple">
                  <Atom />
                </span>
                <span>
                  <strong>Aprendizado interativo</strong>
                  <small>Cada organela, uma descoberta</small>
                </span>
              </div>
              <div>
                <span className="feature-icon gold">
                  <Trophy />
                </span>
                <span>
                  <strong>Desafie seu conhecimento</strong>
                  <small>Monte, resolva e evolua</small>
                </span>
              </div>
              <span className="strip-note">
                FEITO PARA MENTES CURIOSAS <Sparkles size={15} />
              </span>
            </section>
            <section className="experiments">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">SEU PRÓXIMO DESCOBRIMENTO</span>
                  <h2>Três células. Infinitas conexões.</h2>
                </div>
                <button
                  className="text-button"
                  onClick={() => navigate("compare")}
                >
                  Compare as células <ArrowRight size={17} />
                </button>
              </div>
              <CellCards start={start} />
            </section>
            <section className="learning-note">
              <BookOpen size={21} />
              <p>
                Não precisa saber tudo para começar.{" "}
                <strong>A curiosidade já é o primeiro passo.</strong>
              </p>
              <span>ENSINO MÉDIO · BIOLOGIA</span>
            </section>
          </>
        )}
        {page === "play" && !game && (
          <section className="inner-page">
            <span className="eyebrow">BANCADA DE EXPERIMENTOS</span>
            <h1>Escolha o seu experimento</h1>
            <p className="intro">
              Cada célula tem uma história. Qual você vai descobrir primeiro?
            </p>
            <CellCards start={start} />
            <div className="instruction-row">
              <span>
                <b>01</b> Monte a célula
              </span>
              <ChevronRight />
              <span>
                <b>02</b> Resolva desafios
              </span>
              <ChevronRight />
              <span>
                <b>03</b> Teste o que aprendeu
              </span>
            </div>
            <p className="fine-print">
              Modelos didáticos simplificados. A célula procarionte representa
              uma bactéria com parede, plasmídeos e flagelo; essas estruturas
              não são universais.
            </p>
          </section>
        )}
        {page === "play" && game && (
          <section className="inner-page game-page">
            <button
              className="text-button"
              onClick={() => {
                setGame(null);
                setFeedback(null);
              }}
            >
              <ArrowLeft size={16} /> Trocar experimento
            </button>
            <div className="game-heading">
              <div>
                <span className="eyebrow">EXPERIMENTO EM ANDAMENTO</span>
                <h1>{cellName(game.type)}</h1>
              </div>
              <div className="score">
                <Trophy size={22} />
                <strong>{game.score}</strong>
                <span>pontos</span>
              </div>
            </div>
            <div className="steps">
              {["Montagem", "Célula em Perigo", "Quiz final", "Resultado"].map(
                (s, i) => (
                  <span
                    key={s}
                    className={
                      ["build", "challenge", "quiz", "result"][i] === game.phase
                        ? "current"
                        : ""
                    }
                  >
                    <b>{i + 1}</b>
                    {s}
                  </span>
                ),
              )}
            </div>
            {game.phase === "build" && (
              <>
                <div className="game-grid">
                  <div
                    className="cell-workspace"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      add(e.dataTransfer.getData("text/plain"));
                    }}
                  >
                    <div className="workspace-top">
                      <span>
                        <span className="status-dot" /> ÁREA DE OBSERVAÇÃO
                      </span>
                      <strong>
                        {game.added.length} / {required.length} estruturas
                      </strong>
                    </div>
                    <div
                      className="progress"
                      role="progressbar"
                      aria-label="Progresso da montagem"
                      aria-valuenow={game.added.length}
                      aria-valuemin={0}
                      aria-valuemax={required.length}
                    >
                      <div
                        style={{
                          width: `${(game.added.length / required.length) * 100}%`,
                        }}
                      />
                    </div>
                    <CellVisual
                      type={game.type}
                      added={game.added}
                      onSelect={setInfo}
                    />
                    <p className="workspace-hint">
                      {game.added.length
                        ? "Clique nas estruturas adicionadas para conhecê-las."
                        : "Seu experimento começa aqui. Adicione uma estrutura →"}
                    </p>
                    <div className="added-list">
                      {game.added.map((id) => (
                        <button key={id} onClick={() => setInfo(id)}>
                          {getOrg(id).name}
                          <Check size={12} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <aside className="bank">
                    <h2>
                      Banco de organelas <Atom size={20} />
                    </h2>
                    <p>Clique ou arraste para adicionar à célula.</p>
                    <div className="organelle-bank">
                      {organelles.map((o) => (
                        <button
                          key={o.id}
                          disabled={
                            game.added.includes(o.id) ||
                            game.rejected.includes(o.id)
                          }
                          draggable={
                            !game.added.includes(o.id) &&
                            !game.rejected.includes(o.id)
                          }
                          onDragStart={(e) =>
                            e.dataTransfer.setData("text/plain", o.id)
                          }
                          onClick={() => add(o.id)}
                          className={
                            game.added.includes(o.id)
                              ? "added"
                              : game.rejected.includes(o.id)
                                ? "rejected"
                                : ""
                          }
                        >
                          <OrganelleIcon id={o.id} />
                          <span>{o.name}</span>
                          {game.added.includes(o.id) ? (
                            <Check size={15} />
                          ) : game.rejected.includes(o.id) ? (
                            <X size={15} />
                          ) : (
                            <span className="add-symbol">+</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </aside>
                </div>
                <div aria-live="polite">
                  {feedback && (
                    <div
                      className={`feedback ${feedback.ok ? "success" : "error"}`}
                    >
                      <strong>
                        {feedback.ok
                          ? "Correto! +100 pontos"
                          : "Vamos aprender! −25 pontos"}
                      </strong>
                      <span>{feedback.text}</span>
                    </div>
                  )}
                </div>
                {game.type === "prokaryote" && (
                  <p className="science-note">
                    <Lightbulb size={17} /> Procariontes não possuem núcleo
                    delimitado por membrana. Este modelo representa uma
                    bactéria.
                  </p>
                )}
                {game.added.length === required.length && (
                  <div className="completion">
                    <div>
                      <CheckCircle2 />
                      <span>
                        <strong>Célula montada!</strong> Agora, vamos colocá-la
                        à prova.
                      </span>
                    </div>
                    <button
                      className="primary"
                      onClick={() => {
                        setFeedback(null);
                        setGame((g) =>
                          g
                            ? {
                                ...g,
                                phase: "challenge",
                                questions: getQuestions(g.type, "challenge"),
                                index: 0,
                                answer: null,
                              }
                            : g,
                        );
                      }}
                    >
                      Célula em Perigo <ArrowRight size={18} />
                    </button>
                  </div>
                )}
              </>
            )}
            {(game.phase === "challenge" || game.phase === "quiz") && (
              <div className="question-layout">
                <div className="question-card">
                  <span className="eyebrow">
                    {game.phase === "challenge" ? "MISSÃO" : "QUIZ"}{" "}
                    {game.index + 1} DE {game.questions.length}
                  </span>
                  <h2>
                    {game.phase === "challenge"
                      ? "Célula em Perigo"
                      : "Hora de conectar as ideias."}
                  </h2>
                  <p className="question-prompt">
                    {game.questions[game.index].prompt}
                  </p>
                  <div className="answer-options">
                    {game.questions[game.index].options.map((id, i) => (
                      <button
                        key={id}
                        disabled={game.answer !== null}
                        className={
                          game.answer !== null
                            ? id === game.questions[game.index].answer
                              ? "correct-answer"
                              : id === game.answer
                                ? "wrong-answer"
                                : ""
                            : ""
                        }
                        onClick={() => answer(id)}
                      >
                        <b>{String.fromCharCode(65 + i)}</b>
                        <span>{getOrg(id).name}</span>
                        {game.answer !== null &&
                          id === game.questions[game.index].answer && (
                            <Check size={20} />
                          )}
                      </button>
                    ))}
                  </div>
                  <div aria-live="polite">
                    {game.answer !== null && (
                      <div
                        className={`feedback ${game.answer === game.questions[game.index].answer ? "success" : "error"}`}
                      >
                        <strong>
                          {game.answer === game.questions[game.index].answer
                            ? "Você acertou! +100 pontos"
                            : "Quase! −25 pontos"}
                        </strong>
                        <span>
                          <b>
                            {getOrg(game.questions[game.index].answer).name}.
                          </b>{" "}
                          {
                            getOrg(game.questions[game.index].answer)
                              .description
                          }
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    className="primary next-button"
                    disabled={game.answer === null}
                    onClick={next}
                  >
                    {game.index === game.questions.length - 1
                      ? game.phase === "challenge"
                        ? "Ir para o quiz"
                        : "Ver resultado"
                      : "Próxima questão"}
                    <ArrowRight size={17} />
                  </button>
                </div>
                <aside className="question-aside">
                  <CellVisual type={game.type} />
                  <span className="eyebrow">CONHECIMENTO É DESCOBERTA</span>
                  <p>
                    Observe. Pense. Experimente.
                    <br />
                    Cada resposta é uma chance de aprender.
                  </p>
                </aside>
              </div>
            )}
            {game.phase === "result" && (
              <div className="result">
                <div className="result-trophy">
                  <Trophy size={40} />
                </div>
                <span className="eyebrow">UMA NOVA DESCOBERTA CONCLUÍDA</span>
                <h1>Experimento concluído!</h1>
                <p>
                  Você explorou uma {cellName(game.type).toLowerCase()} e suas
                  conexões com a vida.
                </p>
                <div className="result-score">
                  {game.score}
                  <small>pontos</small>
                </div>
                <span className="rank">
                  {game.score >= 1500
                    ? "Mestre do CellLab"
                    : game.score >= 1000
                      ? "Especialista em Células"
                      : game.score >= 500
                        ? "Pesquisador Celular"
                        : "Aprendiz de Citologia"}
                </span>
                <div className="result-stats">
                  <div>
                    <strong>{game.correct}</strong>
                    <span>Acertos totais</span>
                  </div>
                  <div>
                    <strong>{game.wrong}</strong>
                    <span>Erros totais</span>
                  </div>
                  <div>
                    <strong>{game.quizCorrect} / 5</strong>
                    <span>Acertos no quiz</span>
                  </div>
                  <div>
                    <strong>{best}</strong>
                    <span>Seu recorde local</span>
                  </div>
                </div>
                <div className="result-actions">
                  <button className="primary" onClick={() => start(game.type)}>
                    <RotateCcw size={17} /> Jogar novamente
                  </button>
                  <button
                    className="secondary"
                    onClick={() => {
                      setGame(null);
                      navigate("home");
                    }}
                  >
                    Voltar ao laboratório
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
        {page === "atlas" && (
          <section className="inner-page">
            <span className="eyebrow">
              PEQUENAS ESTRUTURAS. GRANDES FUNÇÕES.
            </span>
            <h1>Atlas Celular</h1>
            <p className="intro">
              Conheça as estruturas que fazem a vida acontecer.
            </p>
            <div className="filters">
              {(["all", "animal", "plant", "prokaryote"] as const).map((f) => (
                <button
                  key={f}
                  className={filter === f ? "selected" : ""}
                  onClick={() => setFilter(f)}
                >
                  {f === "all" ? "Todas as estruturas" : cellName(f)}
                </button>
              ))}
            </div>
            <div className="atlas-grid">
              {organelles
                .filter((o) => filter === "all" || o.cellTypes.includes(filter))
                .map((o) => (
                  <button
                    className="atlas-card"
                    key={o.id}
                    onClick={() => setInfo(o.id)}
                  >
                    <div
                      className="atlas-icon"
                      style={{ background: `${o.color}18` }}
                    >
                      <OrganelleIcon id={o.id} />
                      <ArrowUpRight size={18} />
                    </div>
                    <h2>{o.name}</h2>
                    <p>{o.description}</p>
                    <div className="tags">
                      {o.cellTypes.map((t) => (
                        <span key={t}>
                          {t === "animal"
                            ? "Animal"
                            : t === "plant"
                              ? "Vegetal"
                              : "Procarionte"}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
            </div>
            <p className="fine-print">
              As indicações correspondem aos modelos didáticos do jogo. Há
              variações: nem toda célula vegetal tem cloroplastos, e nem toda
              bactéria tem parede, plasmídeos ou flagelo.
            </p>
          </section>
        )}
        {page === "compare" && (
          <section className="inner-page">
            <span className="eyebrow">LADO A LADO, TUDO FAZ MAIS SENTIDO</span>
            <h1>Comparar Células</h1>
            <p className="intro">
              Três formas de organização. A mesma base da vida.
            </p>
            <div className="comparison-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Estrutura</th>
                    {cells.map((c) => (
                      <th key={c.id}>
                        <CellVisual type={c.id} />
                        {c.name}
                        <small>{c.tag}</small>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Núcleo delimitado", "Sim", "Sim", "Não"],
                    ["Parede celular", "Não", "Sim", "Na maioria"],
                    [
                      "Cloroplastos",
                      "Não",
                      "Em células fotossintéticas",
                      "Não",
                    ],
                    ["Mitocôndrias", "Sim", "Sim", "Não"],
                    ["Ribossomos", "Sim", "Sim", "Sim"],
                    ["Membrana plasmática", "Sim", "Sim", "Sim"],
                    [
                      "DNA principal",
                      "No núcleo",
                      "No núcleo",
                      "Na região do nucleoide",
                    ],
                    ["Vacúolo central desenvolvido", "Não", "Sim", "Não"],
                  ].map((row) => (
                    <tr key={row[0]}>
                      {row.map((v, i) =>
                        i === 0 ? (
                          <th key={i} scope="row">
                            {v}
                          </th>
                        ) : (
                          <td key={i}>
                            <span
                              className={
                                v === "Sim" ? "yes" : v === "Não" ? "no" : ""
                              }
                            >
                              {v === "Sim" ? "✓ " : v === "Não" ? "− " : ""}
                              {v}
                            </span>
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="science-note">
              <Lightbulb size={22} />
              <p>
                Animal e vegetal são <strong>eucariontes</strong>. Procariontes
                não possuem núcleo delimitado por membrana. Mitocôndrias e
                cloroplastos também têm DNA próprio.
              </p>
            </div>
          </section>
        )}
        {page === "about" && (
          <section className="inner-page about-page">
            <span className="feature-icon">
              <Microscope size={30} />
            </span>
            <span className="eyebrow">CIÊNCIA AO ALCANCE DE TODOS</span>
            <h1>Sobre o CellLab</h1>
            <p className="intro">
              O CellLab é uma experiência educativa desenvolvida para tornar o
              estudo da Citologia mais visual, interativo e divertido.
            </p>
            <div className="about-card">
              <h2>Projeto de Citologia</h2>
              <p>Integrantes</p>
              {team.map((n) => (
                <strong key={n}>{n}</strong>
              ))}
              <p>Orientação</p>
              <strong>{teacher}</strong>
              <p>Instituição</p>
              <strong>Instituto Federal de Educação, Ciência e Tecnologia da Paraíba - Campus Catolé do Rocha</strong>
            </div>
            <p className="fine-print">
              Representações esquemáticas, sem escala. Conteúdo introdutório
              para o Ensino Médio. O jogo utiliza modelos celulares típicos e
              simplificados.
            </p>
          </section>
        )}
      </main>
      <footer>
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("home");
          }}
        >
          <Atom size={20} />
          Cell<span>Lab</span>
        </a>
        <span>Feito de ciência. Movido por curiosidade.</span>
        <span>
          CITOLOGIA NA PRÁTICA <span className="status-dot" />
        </span>
      </footer>
      {info && (
        <div className="modal-backdrop" onClick={() => setInfo(null)}>
          <section
            className="info-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="organelle-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={dialogClose}
              className="close"
              aria-label="Fechar informações"
              onClick={() => setInfo(null)}
            >
              <X />
            </button>
            <div className="modal-icon">
              <OrganelleIcon id={info} />
            </div>
            <span className="eyebrow">POR DENTRO DA CÉLULA</span>
            <h2 id="organelle-title">{getOrg(info).name}</h2>
            <h3>Função</h3>
            <p>{getOrg(info).description}</p>
            <div className="curiosity">
              <Lightbulb size={20} />
              <div>
                <strong>Você sabia?</strong>
                <p>{getOrg(info).curiosity}</p>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
function CellCards({ start }: { start: (type: CellType) => void }) {
  return (
    <div className="cell-cards">
      {cells.map((c, i) => (
        <button
          className={`cell-card ${c.id}`}
          key={c.id}
          onClick={() => start(c.id)}
        >
          <div className="card-illustration">
            <span className="card-number">0{i + 1}</span>
            <span className="cell-tag">{c.tag}</span>
            <CellVisual type={c.id} />
          </div>
          <div className="card-content">
            <span className="card-subtitle">{c.subtitle}</span>
            <h3>
              {c.name}
              <ArrowUpRight size={21} />
            </h3>
            <p>{c.description}</p>
            <span className="card-cta">
              Explorar célula <ArrowRight size={15} />
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
export default App;
