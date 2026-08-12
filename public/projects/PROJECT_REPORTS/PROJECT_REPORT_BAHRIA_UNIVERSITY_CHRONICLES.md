Bahria University,
Karachi Campus

COURSE: CSL-210 OBJECT ORIENTED PROGRAMMING
TERM: SPRING 2024, CLASS: BSE- 2 (A)

PROJECT NAME

S.NO
1

2

Submitted By:

Student Name
Muhammad
 Umer Qureshi
Muhammad
Umer

Submitted to:

Enrollment #
02-131232-108

02-131232-090

Engr.Mahawish/ Engr. Saniya Sarim

Signed

Remarks:

 Score:

Table of Contents

INTRODUCTION ................................................................................................ 3

OOP CONCEPTS USED ...................................................................................... 4

UML CLASS DIAGRAM ...................................................................................... 6

FEATURES ............................................................................................................. 7

CODE ....................................................................................................................... 9

INTERFACES ...................................................................................................... 95

CONCLUSION .................................................................................................... 98

INTRODUCTION

In our 2D RPG set in Bahria University, you find yourself

teleported back in time by the final boss, "The Finals."

As a student from BSE-2A of the Software Engineering

department, your mission is to navigate through the university,

complete 5 out of 9 quests, and unlock the door to challenge

the boss.

Success means achieving the ultimate reward a 4.0 GPA.

With 40 characters representing your classmates, this game

offers an engaging storyline and a rich display of Object-

Oriented Programming (OOP) concepts, making it both

educational and entertaining.

OOP CONCEPTS USED

Our game extensively utilizes several key OOP concepts:

1.  Inheritance: All NPCs, monsters, and the player inherit from the base

class Entity, showcasing a hierarchical relationship.

2.  Polymorphism: Methods defined in Entity are overridden in Player and NPC

classes, allowing for different implementations based on the object type.

3.  Abstraction: Players interact with their stats through a user-friendly

interface, without needing to manage underlying variables like attack

damage and experience points manually.

4.  Aggregation: The GamePanel class aggregates multiple components such as

AssetSetter, CollisionChecker, CutsceneManager, TileManager,

KeyHandler, and arrays for entities, monsters, and NPCs, demonstrating a

whole-part relationship.

5.  Filing: Unique map and tile creation are handled through filing by assigning

tile sprites a respective number in the text file and reading from it to

draw the map onto the screen, demonstrating innovative use of file

management.

6.  Interfaces: The GamePanel class implements the JPanel interface,

integrating seamlessly with Java's Swing framework and the KeyHandler

class implements the KeyListener interface which is a default interface

provided for user input and key bindings.

7.  Exception Handling: Robust exception handling is implemented where

required to manage scenarios such as file reading errors or unexpected

outputs.

8.  Encapsulation: Player progress and stats are kept private, ensuring they

cannot be manipulated directly, thus maintaining data integrity while other

properties kept public which need access in other classes.

UML CLASS DIAGRAM

FEATURES

1.  Characters: - A wide variety of characters including the

protagonist and all students of our class as NPCs.

2. Quest System: - Players can interact with NPCs to receive

quests. - Quests range from collecting tokens from classmates to

solving conflicts and helping others get respective items.

3. Exploration: - Players can explore different areas of Bahria

University made possible using filing to create tiles and maps -

Discover hidden items, secrets, and side quests while exploring

the campus

4. Boss Battle: - The final boss battle against "The Finals" is the

ultimate challenge of the game. - Players must use their collected

tokens and skills to defeat the boss and restore peace to Bahria

University.

5. Combat Mechanics: Engage in thrilling battles with dynamic

combat mechanics, using a variety of skills and strategies to

overcome enemies.

6. Map of Entire University: Explore a detailed map of Bahria

University, capturing every nook and cranny of the campus for a

truly immersive experience.

7. Day and Night System: Experience the game world with a

realistic day and night cycle, affecting gameplay and NPC

interactions.

8. Enhanced UI: Enjoy an intuitive and immersive user interface

featuring player life represented by paper balls, player stats, and

NPC names displayed overhead.

9. Inventory Management System: Manage your items efficiently

with a robust inventory system, allowing you to organize and

utilize your gear effectively.

10.

Advanced Enemies with AI Pathfinding: Face off against

challenging enemies equipped with advanced AI pathfinding (A*

algorithm), making every encounter unique and strategic.

11.

Speedrun Timer: Challenge yourself and others with a built-

in speedrun timer, tracking your progress and encouraging

replayability.

CODE

Classes in main Package:

Main.java:

package main;

import javax.swing.ImageIcon;

import javax.swing.JFrame;

public class Main {

    public static JFrame window;

    public static void main(String[] args) {

        String vlcLibraryPath = "C:/Program Files/VideoLAN/VLC";

        System.setProperty("jna.library.path", vlcLibraryPath);

        window = new JFrame();

        window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        window.setResizable(false);

        window.setTitle("Bahria University Chronicles : A Test of Unity");

        new Main().setIcon();

        window.setUndecorated(true);

        GamePanel gamePanel = new GamePanel();

        window.add(gamePanel);

        window.pack();

        window.setLocationRelativeTo(null);

        window.setVisible(true);

         gamePanel.setupGame();

         gamePanel.startGameThread();

        gamePanel.startSplashScreen();

    }

    public void setIcon()

    {

        ImageIcon icon = new ImageIcon(getClass().getClassLoader().getResource("res/objects/token.png"));

        window.setIconImage(icon.getImage());

    }

}

GamePanel.java:

package main;

import ai.PathFinder;

import entity.Entity;

import entity.NPC_M_Umer;

import entity.NPC_Jawad;

import entity.NPC_Orange_Cat;

import entity.Player;

import entity.Quest;

import environment.EnvironmentManager;

import java.awt.Color;

import java.awt.Dimension;

import java.awt.Graphics;

import java.awt.Graphics2D;

import java.awt.GraphicsDevice;

import java.awt.GraphicsEnvironment;

import java.awt.List;

import java.awt.RenderingHints;

import java.awt.Toolkit;

import java.awt.image.BufferedImage;

import java.util.ArrayList;

import java.util.Collections;

import java.util.Comparator;

import java.util.Timer;

import java.util.TimerTask;

import javax.swing.JFrame;

import javax.swing.JPanel;

import javax.swing.SwingUtilities;

import tile.TileManager;

import uk.co.caprica.vlcj.component.EmbeddedMediaPlayerComponent;

public class GamePanel extends JPanel implements Runnable

{

    private EmbeddedMediaPlayerComponent mediaPlayerComponent;

    private static final String VIDEO_FILE_PATH = "presents2.mp4";

    final int originalTileSize = 16;

    final int scale = 3;

    //SCREEN SETTINGS

    public  int tileSize = originalTileSize * scale;

    public int maxScreenCol = 20;

    public  int maxScreenRow = 12;

    public  int screenWidth = tileSize * maxScreenCol;

    public  int screenHeight = tileSize * maxScreenRow;

    //WORLD SETTINGS

    public  int maxWorldCol ;

    public  int maxWorldRow ;

    public final int worldWidth = tileSize * maxWorldCol;

    public final int worldHeight = tileSize * maxWorldRow;

    public boolean fullScreenOn = false;

    int screenWidth2 = screenWidth;

     int screenHeight2 = screenHeight;

     BufferedImage tempScreen;

     Graphics2D g2;

    int FPS = 60;

    public TileManager tileM = new TileManager(this);

   public KeyHandler keyH = new KeyHandler(this);

    Sound se = new Sound();

    Sound music = new Sound();

   public CollisionChecker cChecker = new CollisionChecker(this);

   public AssetSetter aSetter = new AssetSetter(this);

   public UI ui = new UI (this);

   public EventHandler eHandler = new EventHandler(this);

   public EnvironmentManager eManager = new EnvironmentManager(this);

     public final int maxMap = 20;

   public int currentMap = 0;

   public Player player = new Player(this,keyH);

   public Entity obj[][]=new Entity[maxMap][100];

   public Entity npc[][]=new Entity[maxMap][100];

    public Entity monster[][]=new Entity[maxMap][50];

    public CutsceneManager csManager = new CutsceneManager(this);

    public PathFinder pFinder = new PathFinder(this);

     Thread gameThread;

   public int gameState;

    public final int titleState=0;

   public final int playState=1;

   public final int pauseState=2;

   public final int dialogueState=3;

   public final int characterState=4;

   public final int optionsState=5;

   public final int gameOverState=6;

   public final int transitionState=7;

   public final int tradeState=8;

      public final int splashState=9;

      public final int cutsceneState=10;

      public boolean bossBattleOn = false;

       public ArrayList<Quest> quests = new ArrayList<>();

   public  ArrayList<Entity> projectileList = new ArrayList<>();

   ArrayList<Entity> entityList = new ArrayList<>();

    public NPC_Jawad merchant;

    public NPC_Orange_Cat oldMan;

    public GamePanel()

    {

        this.setPreferredSize(new Dimension(screenWidth,screenHeight));

        this.setBackground(Color.black);

        this.setDoubleBuffered(true);

        this.addKeyListener(keyH);

        this.setFocusable(true);

         initMediaPlayer();

    }

    public void zoomInOut(int i )

    {

    }

  private void initMediaPlayer() {

        mediaPlayerComponent = new EmbeddedMediaPlayerComponent();

        mediaPlayerComponent.getMediaPlayer().mute(false);

        this.setLayout(null);

        this.add(mediaPlayerComponent);

        mediaPlayerComponent.setBounds(0, 0, screenWidth2, screenHeight2);

        mediaPlayerComponent.getMediaPlayer().addMediaPlayerEventListener(new

uk.co.caprica.vlcj.player.MediaPlayerEventAdapter() {

            @Override

            public void finished(uk.co.caprica.vlcj.player.MediaPlayer mediaPlayer) {

                gameState = titleState;

                mediaPlayerComponent.getMediaPlayer().stop();

                mediaPlayerComponent.setVisible(false);

                Main.window.setUndecorated(true);

                Main.window.setVisible(true);

                Main.window.setLocationRelativeTo(null);

            }

            @Override

            public void error(uk.co.caprica.vlcj.player.MediaPlayer mediaPlayer) {

                System.err.println("Error playing media");

                gameState = splashState;

                mediaPlayerComponent.getMediaPlayer().stop();

                mediaPlayerComponent.setVisible(false);

                // Resize the frame here

                Main.window.setUndecorated(true);

                Main.window.setVisible(true);

                Main.window.setLocationRelativeTo(null);

            }

        });

    }

    public void startSplashScreen() {

        if (mediaPlayerComponent != null && mediaPlayerComponent.getMediaPlayer() != null) {

            SwingUtilities.invokeLater(() -> {

                mediaPlayerComponent.setVisible(true);

                mediaPlayerComponent.getMediaPlayer().prepareMedia(VIDEO_FILE_PATH);

                mediaPlayerComponent.getMediaPlayer().play();

                gameState = splashState;

                Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();

                mediaPlayerComponent.setSize(screenSize);

                mediaPlayerComponent.setPreferredSize(screenSize);

                mediaPlayerComponent.getMediaPlayer().setAspectRatio(String.format("%d:%d", screenSize.width,

screenSize.height));

                mediaPlayerComponent.repaint();

                Main.window.setExtendedState(JFrame.MAXIMIZED_BOTH);

                Main.window.setUndecorated(true);

                Main.window.setVisible(true);

                Main.window.toFront();

                Main.window.requestFocus();

                Main.window.requestFocusInWindow();

            });

        }

    }

    public void setupGame()

    {

        aSetter.setObject();

        aSetter.setNPC();

         aSetter.setMonster();

         eManager.setup();

        gameState=titleState;

        playMusic(15);

         tempScreen = new BufferedImage(screenWidth,screenHeight, BufferedImage.TYPE_INT_ARGB);

         g2 = (Graphics2D)tempScreen.getGraphics();

           setFullScreen();

    }

    public void retry()

    {

        player.setDefaultPositions();

        player.restoreLifeandMana();

         aSetter.setNPC();

         aSetter.setMonster();

    }

    public void reset()

    {

        removeTempEntity();

        bossBattleOn=false;

        player.setDefaultPositions();

        player.restoreLifeandMana();

        player.setItems();

         aSetter.setNPC();

         aSetter.setMonster();

          aSetter.setObject();

    }

    public void startGameThread()

    {

        gameThread = new Thread(this);

        gameThread.start();

    }

    @Override

    public void run()

    {

        double drawInterval = 1000000000/FPS;

        double delta = 0;

        long lastTime = System.nanoTime();

        long currentTime = System.nanoTime();

        while(gameThread != null)

        {

            currentTime= System.nanoTime();

            delta += (currentTime-lastTime)/drawInterval;

            lastTime = currentTime;

            if(delta>=1)

            {

                update();

                drawTempScreen();

                drawScreen();

                delta--;

            }

        }

    }

    public void setFullScreen()

    {

        GraphicsEnvironment ge = GraphicsEnvironment.getLocalGraphicsEnvironment();

        GraphicsDevice gd = ge.getDefaultScreenDevice();

        gd.setFullScreenWindow(Main.window);

        screenWidth2 = Main.window.getWidth();

         screenHeight2 = Main.window.getHeight();

    }

    public void update()

    {

        if(gameState == playState)

        {

             player.update();

             for(int i = 0; i<npc[1].length; i++)

        {

            if(npc[currentMap][i]!=null)

            {

                npc[currentMap][i].update();

            }

        }

             for(int i = 0; i<monster[1].length; i++)

        {

            if(monster[currentMap][i]!=null)

            {

                if(monster[currentMap][i].alive==true && monster[currentMap][i].dying==false)

                {

                     monster[currentMap][i].update();

                }

                 if(monster[currentMap][i].alive==false)

                {

                     monster[currentMap][i].checkDrop();

                    monster[currentMap][i]=null;

                }

            }

        }

             for(int i = 0; i<projectileList.size(); i++)

        {

            if(projectileList.get(i)!=null)

            {

                if(projectileList.get(i).alive==true)

                {

                     projectileList.get(i).update();

                }

                 if(projectileList.get(i).alive==false)

                {

                    projectileList.remove(i);

                }

            }

        }

             eManager.update();

        }

        if(gameState == pauseState)

        {

        }

    }

    public void drawScreen()

    {

        Graphics g = getGraphics();

        g.drawImage(tempScreen,0,0,screenWidth2,screenHeight2,null);

        g.dispose();

    }

    public void removeTempEntity()

    {

        for(int mapNum = 0 ; mapNum< maxMap; mapNum++)

        {

            for(int i = 0; i < obj[1].length; i++)

            {

                if(obj[mapNum][i] != null  && obj[mapNum][i].temp == true)

                {

                    obj[mapNum][i] = null;

                }

            }

        }

    }

    public void drawTempScreen()

    {

        g2.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);

    g2.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);

    g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        if(gameState==titleState)

        {

            g2.setColor(Color.BLACK);

    g2.fillRect(0, 0, screenWidth2, screenHeight2);

    g2.setColor(Color.WHITE);

            ui.draw(g2);

        }

       else if(gameState==splashState)

        {

        }

        else

        {

        //TILES

        tileM.draw(g2);

        //PLAYER

        entityList.add(player);

        //NPC

        for(int i = 0; i < npc[1].length ; i++)

        {

            if(npc[currentMap][i]!=null)

            {

                 entityList.add(npc[currentMap][i]);

            }

        }

        //OBJECT

         for(int i = 0; i < obj[1].length ; i++)

        {

            if(obj[currentMap][i]!=null)

            {

                 entityList.add(obj[currentMap][i]);

            }

        }

         //MONSTER

         for(int i = 0; i < monster[1].length ; i++)

        {

            if(monster[currentMap][i]!=null)

            {

                 entityList.add(monster[currentMap][i]);

            }

        }

         for(int i = 0; i < projectileList.size() ; i++)

        {

            if(projectileList.get(i)!=null)

            {

                 entityList.add(projectileList.get(i));

            }

        }

         Collections.sort(entityList, new Comparator<Entity>()

         {

            @Override

            public int compare(Entity e1, Entity e2)

            {

                int result = Integer.compare(e1.worldY, e2.worldY);

                return result;

            }

        });

        for(int i = 0; i < entityList.size() ; i++)

        {

            entityList.get(i).draw(g2);

        }

         entityList.clear();

        if(currentMap==12)

        {

         eManager.draw2(g2);

        }

        //UI

        if(currentMap==0)

        {

        eManager.draw(g2);

        }

        else

        {

         eManager.drawText(g2);

//          if(currentMap==1 || currentMap==2 ||currentMap==3 ||currentMap==4 ||currentMap==5 ||currentMap==6 ||

currentMap==10 )

//        {

//         eManager.draw3(g2);

//        }

        }

         csManager.draw(g2);

        ui.draw(g2);

        }

    }

    public void playMusic(int i)

    {

        music.setFile(i);

        music.play();

        music.loop();

    }

    public void stopMusic()

    {

       music.stop();

    }

     public void playSE(int i)

    {

        se.setFile(i);

        se.play();

    }

    public void drawSplashScreen() {

        mediaPlayerComponent.getVideoSurface().paint(mediaPlayerComponent.getVideoSurface().getGraphics());

    }

}

KeyHandler.java:

package main;

import java.awt.event.KeyEvent;

import java.awt.event.KeyListener;

public class KeyHandler implements KeyListener

{

   GamePanel gp;

   public boolean upPressed,downPressed,leftPressed,rightPressed,enterPressed,shotKeyPressed,godModeOn=false;

    public KeyHandler(GamePanel gp)

    {

        this.gp=gp;

    }

    @Override

    public void keyTyped(KeyEvent e) {

    }

    @Override

    public void keyPressed(KeyEvent e)

    {

         int code = e.getKeyCode();

         if(gp.gameState==gp.titleState)

         {

             titleState(code);

         }

         else if(gp.gameState==gp.playState)

         {

               playState(code);

         }

         else if(gp.gameState==gp.cutsceneState)

         {

               cutsceneState(code);

         }

       else if(gp.gameState==gp.pauseState)

        {

            pauseState(code);

        }

       else if(gp.gameState==gp.dialogueState)

        {

            dialogueState(code);

        }

        else if(gp.gameState==gp.characterState)

        {

            characterState(code);

        }

         else if(gp.gameState==gp.optionsState)

        {

            optionsState(code);

        }

        else if(gp.gameState==gp.gameOverState)

         {

               gameOverState(code);

         }

         else if(gp.gameState==gp.tradeState)

         {

               tradeState(code);

         }

    }

    public void titleState(int code)

    {

        if(code==KeyEvent.VK_W)

            {

            gp.ui.commandNum--;

            if(gp.ui.commandNum<0)

            {

                gp.ui.commandNum=2;

            }

            }

            if(code==KeyEvent.VK_S)

            {

             gp.ui.commandNum++;

             if(gp.ui.commandNum>2)

            {

                gp.ui.commandNum=0;

            }

            }

            if(code==KeyEvent.VK_ENTER)

            {

                if(gp.ui.commandNum==0)

            {

               gp.stopMusic();

               gp.gameState=gp.cutsceneState;

               gp.csManager.sceneNum = gp.csManager.start;

            }

                if(gp.ui.commandNum==1)

            {

                //LOAD STUFF LATERa

            }

                if(gp.ui.commandNum==2)

            {

               System.exit(0);

            }

            }

    }

    public void playState(int code)

    {

        if(code==KeyEvent.VK_W)

        {

            upPressed=true;

        }

        if(code==KeyEvent.VK_S)

        {

            downPressed=true;

        }

        if(code==KeyEvent.VK_A)

        {

            leftPressed=true;

        }

        if(code==KeyEvent.VK_D)

        {

            rightPressed=true;

        }

        if(code==KeyEvent.VK_ENTER)

        {

            enterPressed=true;

        }

         if(code==KeyEvent.VK_C)

        {

             gp.gameState=gp.characterState;

        }

        if(code==KeyEvent.VK_P)

        {

            gp.gameState=gp.pauseState;

        }

        if(code==KeyEvent.VK_ESCAPE)

        {

            gp.gameState=gp.optionsState;

        }

        if(code==KeyEvent.VK_CONTROL)

        {

            shotKeyPressed=true;

        }

         if(code==KeyEvent.VK_G)

        {

            if(godModeOn==false)

            {

                System.out.println("GOD MODE ON");

                godModeOn=true;

            }

            else if(godModeOn==true)

            {

                System.out.println("GOD MODE OFF");

                godModeOn=false;

            }

        }

    }

    public void pauseState(int code)

    {

        if(code==KeyEvent.VK_P)

        {

            gp.gameState=gp.playState;

        }

    }

     public void cutsceneState(int code)

    {

        if(code==KeyEvent.VK_ENTER)

        {

            gp.gameState=gp.playState;

            gp.csManager.scenePhase++;

        }

    }

    public void dialogueState(int code)

    {

        if(code==KeyEvent.VK_ENTER)

        {

            gp.gameState=gp.playState;

        }

    }

    public void characterState(int code)

    {

        if(code==KeyEvent.VK_C)

        {

            gp.gameState=gp.playState;

        }

        if(code==KeyEvent.VK_ENTER)

        {

           gp.player.selectItem();

        }

        playerInventory(code);

    }

    public void optionsState(int code)

    {

         if(code==KeyEvent.VK_ESCAPE)

        {

          gp.gameState=gp.playState;

        }

         if(code==KeyEvent.VK_ENTER)

        {

           enterPressed=true;

           if(gp.ui.commandNum==4 && enterPressed==true)

           {

               gp.gameState=gp.titleState;

               gp.stopMusic();

           }

        }

         int maxCommandNum = 0;

         switch(gp.ui.subState)

         {

             case 0:

                 maxCommandNum=5;

                 break;

                 case 3:

                 break;

         }

         if(code==KeyEvent.VK_W)

        {

          gp.ui.commandNum--;

          gp.playSE(8);

          if(gp.ui.commandNum<0)

          {

              gp.ui.commandNum=maxCommandNum;

          }

        }

         if(code==KeyEvent.VK_S)

        {

           gp.ui.commandNum++;

          gp.playSE(8);

          if(gp.ui.commandNum>maxCommandNum)

          {

              gp.ui.commandNum=0;

          }

        }

         if(code==KeyEvent.VK_A)

        {

            if(gp.ui.subState==0)

            {

                if(gp.ui.commandNum==1 && gp.music.volumeScale > 0)

                {

                    gp.music.volumeScale--;

                    gp.music.checkVolume();

                    gp.playSE(8);

                }

                 if(gp.ui.commandNum==2 && gp.se.volumeScale > 0)

                {

                    gp.se.volumeScale--;

                    gp.playSE(8);

                }

            }

        }

         if(code==KeyEvent.VK_D)

        {

            if(gp.ui.subState==0)

            {

                if(gp.ui.commandNum==1 && gp.music.volumeScale < 5)

                {

                    gp.music.volumeScale++;

                    gp.music.checkVolume();

                    gp.playSE(8);

                }

                 if(gp.ui.commandNum==2 && gp.se.volumeScale < 5)

                {

                    gp.se.volumeScale++;

                    gp.playSE(8);

                }

            }

        }

    }

    public void gameOverState(int code)

    {

          if(code==KeyEvent.VK_W)

        { gp.ui.commandNum--;

          if(gp.ui.commandNum<0)

          {

              gp.ui.commandNum=1;

          }

          gp.playSE(8);

        }

          if(code==KeyEvent.VK_S)

        { gp.ui.commandNum++;

          if(gp.ui.commandNum>1)

          {

              gp.ui.commandNum=0;

          }

          gp.playSE(8);

        }

          if(code==KeyEvent.VK_ENTER)

        {

          if(gp.ui.commandNum==0)

          {

              gp.gameState = gp.playState;

              gp.retry();

          }

          else if(gp.ui.commandNum==1)

          {

              gp.gameState = gp.titleState;

              gp.reset();

              gp.stopMusic();

          }

        }

    }

    public void tradeState(int code)

    {

        if(code==KeyEvent.VK_ENTER)

        {

            enterPressed=true;

        }

        if(gp.ui.subState==0)

        {

            if(code==KeyEvent.VK_W)

            {

                 gp.ui.commandNum--;

                if(gp.ui.commandNum<0)

                {

                    gp.ui.commandNum=2;

                }

                gp.playSE(8);

            }

            if(code==KeyEvent.VK_S)

            {

                 gp.ui.commandNum++;

                if(gp.ui.commandNum>2)

                {

                    gp.ui.commandNum=0;

                }

                 gp.playSE(8);

            }

        }

        if(gp.ui.subState==1)

        {

            npcInventory(code);

            if(code==KeyEvent.VK_ESCAPE)

            {

                gp.ui.subState=0;

            }

        }

        if(gp.ui.subState==2)

        {

            playerInventory(code);

            if(code==KeyEvent.VK_ESCAPE)

            {

                gp.ui.subState=0;

            }

        }

    }

    public void playerInventory(int code)

    {

        if(code==KeyEvent.VK_W)

        {

            if(gp.ui.playerSlotRow!=0)

            {

             gp.ui.playerSlotRow--;

             gp.playSE(8);

            }

        }

        if(code==KeyEvent.VK_A)

        {

            if(gp.ui.playerSlotCol!=0)

            {

            gp.ui.playerSlotCol--;

            gp.playSE(8);

            }

        }

        if(code==KeyEvent.VK_S)

        {

            if(gp.ui.playerSlotRow!=3)

            {

           gp.ui.playerSlotRow++;

           gp.playSE(8);

            }

        }

        if(code==KeyEvent.VK_D)

        {

            if(gp.ui.playerSlotCol!=4)

           gp.ui.playerSlotCol++;

            gp.playSE(8);

        }

    }

    public void npcInventory(int code)

    {

        if(code==KeyEvent.VK_W)

        {

            if(gp.ui.npcSlotRow!=0)

            {

             gp.ui.npcSlotRow--;

             gp.playSE(8);

            }

        }

        if(code==KeyEvent.VK_A)

        {

            if(gp.ui.npcSlotCol!=0)

            {

            gp.ui.npcSlotCol--;

            gp.playSE(8);

            }

        }

        if(code==KeyEvent.VK_S)

        {

            if(gp.ui.npcSlotRow!=3)

            {

           gp.ui.npcSlotRow++;

           gp.playSE(8);

            }

        }

        if(code==KeyEvent.VK_D)

        {

            if(gp.ui.npcSlotCol!=4)

           gp.ui.npcSlotCol++;

            gp.playSE(8);

        }

    }

    @Override

    public void keyReleased(KeyEvent e)

    {

        int code = e.getKeyCode();

        if(code==KeyEvent.VK_W)

        {

            upPressed=false;

        }

        if(code==KeyEvent.VK_S)

        {

            downPressed=false;

        }

        if(code==KeyEvent.VK_A)

        {

            leftPressed=false;

        }

        if(code==KeyEvent.VK_D)

        {

            rightPressed=false;

        }

        if(code==KeyEvent.VK_CONTROL)

        {

            shotKeyPressed=false;

        }

    }

}

UI.java:

package main;

import entity.Entity;

import java.awt.BasicStroke;

import java.awt.Color;

import java.awt.Font;

import java.awt.FontFormatException;

import java.awt.Graphics2D;

import java.awt.Image;

import java.awt.RenderingHints;

import static java.awt.font.TextAttribute.FONT;

import java.awt.image.BufferedImage;

import java.io.File;

import java.io.IOException;

import java.io.InputStream;

import java.text.DecimalFormat;

import java.util.ArrayList;

import javax.imageio.ImageIO;

import javax.swing.ImageIcon;

import object.OBJ_Cash_100;

import object.OBJ_Heart;

import object.OBJ_Key;

import object.OBJ_ManaBall;

public class UI

{

    private String questTitle;

    GamePanel gp;

    Graphics2D g2;

    Font a,b,c,d,e,f,g;;

    public boolean messageOn = false;

    ArrayList<String> message = new ArrayList<>();

    ArrayList<Integer> messageCounter = new ArrayList<>();

    public boolean gameFinished = false;

    public String currentDialogue = "";

    public int commandNum=0;

    BufferedImage heart_full,heart_half,heart_blank,ball_full,ball_blank,cash;

    public int playerSlotCol=0;

    public int playerSlotRow=0;

    public int npcSlotCol=0;

    public int npcSlotRow=0;

    int subState = 0;

    int counter = 0;

//    public String currentNPCName;

    public Entity npc;

    public UI(GamePanel gp)

    {

        this.gp=gp;

        try

        {

            InputStream is = getClass().getResourceAsStream("/res/fonts/Daydream.ttf");

            a = Font.createFont(Font.TRUETYPE_FONT,is);

            is = getClass().getResourceAsStream("/res/fonts/KGMissKindergarten.ttf");

            b = Font.createFont(Font.TRUETYPE_FONT,is);

             is = getClass().getResourceAsStream("/res/fonts/KGSecondChancesSketch.ttf");

            c = Font.createFont(Font.TRUETYPE_FONT,is);

             is = getClass().getResourceAsStream("/res/fonts/Light Stories.ttf");

            d = Font.createFont(Font.TRUETYPE_FONT,is);

             is = getClass().getResourceAsStream("/res/fonts/Super Creamy Personal Use.ttf");

            e = Font.createFont(Font.TRUETYPE_FONT,is);

             is = getClass().getResourceAsStream("/res/fonts/Super Friday Personal Use.ttf");

            f = Font.createFont(Font.TRUETYPE_FONT,is);

             is = getClass().getResourceAsStream("/res/fonts/Winkle-Regular.ttf");

            g = Font.createFont(Font.TRUETYPE_FONT,is);

        }

        catch(IOException e)

        {

            e.printStackTrace();

        }

        catch(FontFormatException e)

        {

            e.printStackTrace();

        }

        Entity heart = new OBJ_Heart(gp);

        heart_full=heart.image;

        heart_half=heart.image2;

        heart_blank=heart.image3;

         Entity ball = new OBJ_ManaBall(gp);

        ball_full=ball.image;

        ball_blank=ball.image2;

         Entity cash1 = new OBJ_Cash_100(gp);

         cash = cash1.down1;

    }

    public void addMessage(String text)

    {

        message.add(text);

        messageCounter.add(0);

    }

    public void draw(Graphics2D g2)

    {

        this.g2=g2;

        g2.setFont(b);

        g2.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING,RenderingHints.VALUE_TEXT_ANTIALIAS_ON);

        g2.setColor(Color.white);

        if(gp.gameState==gp.titleState)

            {

               drawTitleScreen();

            }

        else if(gp.gameState==gp.pauseState)

            {

                drawPlayerLife();

                drawPauseScreen();

            }

        else if(gp.gameState==gp.dialogueState)

            {

               drawDialogueScreen();

            }

        else if(gp.gameState==gp.playState)

            {

                drawPlayerLife();

                drawNPCNames();

               drawQuest();

                drawMessage();

                drawMonsterLife();

            }

        else if(gp.gameState==gp.characterState)

            {

                drawCharacterScreen();

                drawInventory(gp.player,true);

            }

       else if(gp.gameState==gp.optionsState)

            {

                drawOptionsScreen();

            }

        else if(gp.gameState==gp.gameOverState)

            {

                drawGameOverScreen();

            }

        else if(gp.gameState==gp.transitionState)

            {

                drawTransition();

            }

        else if(gp.gameState==gp.tradeState)

            {

                drawTradeScreen();

            }

         else if(gp.gameState==gp.splashState)

            {

                drawSplashScreen(g2);

            }

    }

     public void drawSplashScreen(Graphics2D g2) {

        gp.drawSplashScreen();

    }

    public void setQuestTitle(String questTitle) {

    if (!questTitle.equals("")) {

        this.questTitle = "Current Quest: " + questTitle;

    }

    else

    {

        this.questTitle = questTitle;

    }

    // Display the title for 120 frames (adjust as needed)

}

    public void drawMonsterLife()

    {

        for(int i = 0; i <gp.monster[1].length ; i++)

        {

            if(gp.monster[gp.currentMap][i] != null && gp.monster[gp.currentMap][i].inCamera()==true)

            {

                 if(gp.monster[gp.currentMap][i].hpBarOn==true && gp.monster[gp.currentMap][i].boss==false)

                {

                    double oneScale = (double)gp.tileSize/gp.monster[gp.currentMap][i].maxLife;

                    double hpBarValue = oneScale*gp.monster[gp.currentMap][i].life;

                 g2.setColor(new Color(35, 35, 35));

                 g2.fillRect(gp.monster[gp.currentMap][i].getScreenX() - 1, gp.monster[gp.currentMap][i].getScreenY() - 15,

gp.tileSize + 2, 6);

                 g2.setColor(new Color(255, 0, 30));

                 g2.fillRect(gp.monster[gp.currentMap][i].getScreenX(), gp.monster[gp.currentMap][i].getScreenY() - 14,

(int)hpBarValue, 4);

                 gp.monster[gp.currentMap][i].hpBarCounter++;

                 if(gp.monster[gp.currentMap][i].hpBarCounter >300)

                 {

                     gp.monster[gp.currentMap][i].hpBarCounter=0;

                     gp.monster[gp.currentMap][i].hpBarOn=false;

                 }

                }

                 else if(gp.monster[gp.currentMap][i].boss==true)

                 {

                      double oneScale = (double)gp.tileSize*8/gp.monster[gp.currentMap][i].maxLife;

                    double hpBarValue = oneScale*gp.monster[gp.currentMap][i].life;

                    int x = gp.screenWidth/2 - gp.tileSize*4;

                    int y = gp.tileSize*10;

                 g2.setColor(new Color(35, 35, 35));

                 g2.fillRect(x-1, y-1, gp.tileSize*8 + 2, 22);

                 g2.setColor(new Color(255, 0, 30));

                 g2.fillRect(x,y,(int)hpBarValue, 20);

                 g2.setFont(g2.getFont().deriveFont(Font.BOLD,24F));

                 g2.setColor(Color.white);

                 g2.drawString(gp.monster[gp.currentMap][i].name,x+4,y-10);

                 }

            }

        }

    }

   public void drawNPCNames() {

    for (int i = 0; i < gp.npc[1].length; i++) {

        if (gp.npc[gp.currentMap][i] != null && gp.npc[gp.currentMap][i].inCamera()) {

            int npcX = gp.npc[gp.currentMap][i].getScreenX();

            int npcY = gp.npc[gp.currentMap][i].getScreenY();

            // Set font

            g2.setFont(g2.getFont().deriveFont(Font.BOLD, 18F));

            // Draw shadow for better visibility

            g2.setColor(Color.BLACK);

            g2.drawString(gp.npc[gp.currentMap][i].name, npcX + 2, npcY - 22);

            // Determine color based on NPC type and draw name

            if (gp.npc[gp.currentMap][i].type == Entity.type_npc) {

                g2.setColor(Color.white); // Color for regular NPC

            } else if (gp.npc[gp.currentMap][i].type == Entity.type_quest_giver) {

                g2.setColor(Color.yellow); // Color for quest giver NPC

            }

            else if (gp.npc[gp.currentMap][i].type == Entity.type_quest_item)

            {

                g2.setColor(Color.green); // Color for quest item NPC

            }

            g2.drawString(gp.npc[gp.currentMap][i].name, npcX, npcY - 24);

        }

          for (int j = 0; j < gp.monster[1].length; j++) {

        if (gp.monster[gp.currentMap][j] != null && gp.monster[gp.currentMap][j].inCamera()) {

            int monsterX = gp.monster[gp.currentMap][j].getScreenX();

            int monsterY = gp.monster[gp.currentMap][j].getScreenY();

            // Set font

            g2.setFont(g2.getFont().deriveFont(Font.BOLD, 18F));

            // Draw shadow for better visibility

            g2.setColor(Color.BLACK);

            g2.drawString(gp.monster[gp.currentMap][j].name, monsterX + 2, monsterY - 22);

            // Determine color based on NPC type and draw name

            if (gp.monster[gp.currentMap][j].type == Entity.type_monster) {

                g2.setColor(Color.red); // Color for regular NPC

            }

            g2.drawString(gp.monster[gp.currentMap][j].name, monsterX, monsterY - 24);

        }

    }

}

          }

    public void drawTradeScreen()

    {

        switch(subState)

        {

                case 0:

                    trade_select();

                break;

                 case 1:

                     trade_buy();

                break;

                 case 2:

                     trade_sell();

                break;

        }

        gp.keyH.enterPressed=false;

    }

    public void trade_select()

    {

        drawDialogueScreen();

        int x = gp.tileSize*15;

        int y = gp.tileSize*4;

        int width = gp.tileSize * 3;

        int height = (int)(gp.tileSize * 3.5);

        drawSubWindow(x,y,width,height);

        x+=gp.tileSize-10;

        y+=gp.tileSize;

        g2.drawString("Buy",x,y);

        if(commandNum==0)

        {

         g2.drawString(">", x-24, y);

         if(gp.keyH.enterPressed==true)

         {

             subState=1;

         }

        }

        y+=gp.tileSize;

        g2.drawString("Sell",x,y);

        if(commandNum==1)

        {

         g2.drawString(">", x-24, y);

         if(gp.keyH.enterPressed==true)

         {

             subState=2;

         }

        }

        y+=gp.tileSize;

        g2.drawString("Leave",x,y);

        if(commandNum==2)

        {

         g2.drawString(">", x-24, y);

         if(gp.keyH.enterPressed==true)

         {

             commandNum=0;

             gp.gameState = gp.dialogueState;

             currentDialogue="See you later!";

         }

        }

    }

    public void trade_buy()

    {

        drawInventory(gp.player,false);

        drawInventory(npc,true);

        int x = gp.tileSize*2;

        int y = gp.tileSize*9;

        int width = gp.tileSize*6;

        int height = gp.tileSize*2;

//         g2.setFont(g2.getFont().deriveFont(Font.PLAIN,20F));

        drawSubWindow(x,y,width,height);

        g2.drawString("[ESC]Back",x+24,y+50);

        x = gp.tileSize*12;

        y = gp.tileSize*9;

        width = gp.tileSize*6;

        height = gp.tileSize*2;

        drawSubWindow(x,y,width,height);

        g2.drawString("Your Money : "+gp.player.coin,x+24,y+54);

        int itemIndex = getItemIndex(npcSlotCol,npcSlotRow);

        if(itemIndex < npc.inventory.size())

        {

        x = (int)(gp.tileSize*5.5);

        y = (int)(gp.tileSize*5.5);

        width = (int)(gp.tileSize*2.5);

        height = gp.tileSize;

        drawSubWindow(x,y,width,height);

        g2.drawImage(cash,x+10,y+2,48,48,null);

        int price = npc.inventory.get(itemIndex).price;

        String text = " "+price;

        x = getXforRightText(text,gp.tileSize*8-20);

        g2.drawString(text,x,y+34);

        if(gp.keyH.enterPressed==true)

        {

            if(npc.inventory.get(itemIndex).price>gp.player.coin)

            {

                subState = 0;

                gp.gameState=gp.dialogueState;

                currentDialogue="Sorry you are broke.";

                drawDialogueScreen();

            }

            else

            {

                if(gp.player.canObtainItem(npc.inventory.get(itemIndex))==true)

                {

                    gp.player.coin-=npc.inventory.get(itemIndex).price;

                }

                else

                {

                    subState = 0;

                    gp.gameState=gp.dialogueState;

                    currentDialogue="You can't carry any more items!";

                }

            }

//           else if(gp.player.inventory.size()== gp.player.maxInventorySize)

//            {

//                subState = 0;

//                gp.gameState=gp.dialogueState;

//                currentDialogue="You can't carry any more items!";

//                drawDialogueScreen();

//            }

//            else

//           {

//               gp.player.coin-=npc.inventory.get(itemIndex).price;

//               gp.player.inventory.add(npc.inventory.get(itemIndex));

//           }

        }

        }

    }

    public void trade_sell()

    {

        drawInventory(gp.player,true);

        int x ;

        int y;

        int width;

        int height;

        x = gp.tileSize*12;

        y = gp.tileSize*9;

        width = gp.tileSize*6;

        height = gp.tileSize*2;

        drawSubWindow(x,y,width,height);

        g2.drawString("Your Money : "+gp.player.coin,x+24,y+54);

        int itemIndex = getItemIndex(playerSlotCol,playerSlotRow);

        if(itemIndex < gp.player.inventory.size())

        {

        x = (int)(gp.tileSize*15.5);

        y = (int)(gp.tileSize*5.5);

        width = (int)(gp.tileSize*2.5);

        height = gp.tileSize;

        drawSubWindow(x,y,width,height);

        g2.drawImage(cash,x+10,y+2,48,48,null);

        int price = gp.player.inventory.get(itemIndex).price/2;

        String text = " "+price;

        x = getXforRightText(text,gp.tileSize*18-20);

        g2.drawString(text,x,y+34);

        if(gp.keyH.enterPressed==true)

        {

           if(gp.player.inventory.get(itemIndex)== gp.player.currentWeapon || gp.player.inventory.get(itemIndex)==

gp.player.currentShield )

           {

                commandNum= 0;

                subState= 0;

                gp.gameState=gp.dialogueState;

                currentDialogue="You can't sell equipped items!";

                drawDialogueScreen();

           }

           else

           {

               if( gp.player.inventory.get(itemIndex).amount > 1)

               {

                   gp.player.inventory.get(itemIndex).amount--;

               }

               else

               {

               gp.player.inventory.remove(itemIndex);

               }

                gp.player.coin+=price;

           }

        }

        }

    }

     public void drawQuest() {

       if(questTitle!=null)

       {

        int x;

        int y;

        String text;

        g2.setFont(g2.getFont().deriveFont(Font.BOLD,30F));

        text = questTitle;

        g2.setColor(Color.black);

        x = getXforCenteredText(text);

        y = gp.tileSize*2;

        g2.drawString(text,x,y+20);

        g2.setColor(Color.yellow);

        g2.drawString(text,x-2,y+18);

       }

    }

    public void drawTransition()

    {

        counter++;

        g2.setColor(new Color(0,0,0,counter*5));

        g2.fillRect(0,0, gp.screenWidth, gp.screenHeight);

        if(counter==50)

        {

            counter = 0;

            gp.gameState = gp.playState;

            gp.currentMap = gp.eHandler.tempMap;

            gp.player.worldX = gp.tileSize * gp.eHandler.tempCol;

            gp.player.worldY = gp.tileSize * gp.eHandler.tempRow;

            gp.eHandler.prevEventX= gp.player.worldX;

            gp.eHandler.prevEventY= gp.player.worldY;

        }

    }

    public void drawGameOverScreen()

    {

        g2.setColor(new Color(0,0,0,150));

        g2.fillRect(0,0,gp.screenWidth, gp.screenHeight);

        int x;

        int y;

        String text;

        g2.setFont(g2.getFont().deriveFont(Font.BOLD,115F));

        text = "Game Over";

        g2.setColor(Color.black);

        x = getXforCenteredText(text);

        y = gp.tileSize*4;

        g2.drawString(text,x,y);

        g2.setColor(Color.white);

        g2.drawString(text,x-4,y-4);

         g2.setFont(g2.getFont().deriveFont(45F));

         text = "Retry";

          x = getXforCenteredText(text);

            y += gp.tileSize*4;

            g2.drawString(text, x, y);

            if(commandNum==0)

            {

                g2.drawString(">", x-40, y);

            }

            text = "Exit to Main Menu";

          x = getXforCenteredText(text);

            y += 55;

            g2.drawString(text, x, y);

            if(commandNum==1)

            {

                g2.drawString(">", x-40, y);

            }

    }

    public void drawOptionsScreen()

    {

        g2.setColor(Color.white);

        g2.setFont(g2.getFont().deriveFont(37F));

         int frameX=gp.tileSize*6;

         int frameY=gp.tileSize;

         int frameWidth=gp.tileSize*8;

         int frameHeight=gp.tileSize*10;

         drawSubWindow(frameX,frameY,frameWidth,frameHeight);

         switch(subState)

         {

                 case 0 :

                     options_top(frameX,frameY);

                 break;

                 case 1 :

                      options_fullScreen(frameX,frameY);

                 break;

                 case 2 :

                     options_controls(frameX,frameY);

                 break;

         }

         gp.keyH.enterPressed=false;

    }

    public void options_top(int frameX , int frameY)

    {

        int textX ;

        int textY ;

        String text = "Options";

        textX = getXforCenteredText(text);

        textY = frameY + gp.tileSize + 15;

        g2.drawString(text, textX, textY);

        g2.setFont(g2.getFont().deriveFont(30F));

        textX = frameX + gp.tileSize;

        textY += gp.tileSize+20;

        g2.drawString("Full Screen", textX, textY);

        if(commandNum==0)

        {

            g2.drawString(">", textX-25, textY);

            if(gp.keyH.enterPressed==true)

            {

                if(gp.fullScreenOn==false)

                {

                    gp.fullScreenOn=true;

                }

                else if(gp.fullScreenOn==true)

                {

                    gp.fullScreenOn=false;

                }

                subState=1;

            }

        }

        textY += gp.tileSize;

        g2.drawString("Music", textX, textY);

        if(commandNum==1)

        {

            g2.drawString(">", textX-25, textY);

        }

        textY += gp.tileSize;

        g2.drawString("SFX", textX, textY);

        if(commandNum==2)

        {

            g2.drawString(">", textX-25, textY);

        }

        textY += gp.tileSize;

        g2.drawString("Controls", textX, textY);

        if(commandNum==3)

        {

            g2.drawString(">", textX-25, textY);

            if(gp.keyH.enterPressed==true)

            {

                subState=2;

                commandNum=0;

            }

        }

        textY += gp.tileSize;

        g2.drawString("Exit Game", textX, textY);

        if(commandNum==4)

        {

            g2.drawString(">", textX-25, textY);

            if(gp.keyH.enterPressed==true)

            {

                subState=0;

            }

        }

        textY += gp.tileSize+20;

        g2.drawString("Back", textX, textY);

        if(commandNum==5)

        {

            g2.drawString(">", textX-25, textY);

            if(gp.keyH.enterPressed==true)

            {

                subState=0;

                gp.gameState=gp.playState;

            }

        }

        textX = frameX + gp.tileSize*5 -20;

        textY = frameY + gp.tileSize*2 + 12 ;

        g2.setStroke(new BasicStroke(3));

        g2.drawRect(textX, textY, 24, 24);

        if(gp.fullScreenOn==true)

        {

             g2.fillRect(textX, textY, 24, 24);

        }

        textY += gp.tileSize;

        g2.drawRect(textX, textY, 120, 24);

        int volumeWidth = 24 * gp.music.volumeScale;

        g2.fillRect(textX, textY, volumeWidth, 24);

        textY += gp.tileSize;

        g2.drawRect(textX, textY, 120, 24);

        volumeWidth = 24 * gp.se.volumeScale;

        g2.fillRect(textX, textY, volumeWidth, 24);

    }

    public void options_fullScreen(int frameX,int frameY)

    {

        int textX = frameX + gp.tileSize;

        int textY = frameY + gp.tileSize*3;

        currentDialogue = "Changes will be \n\n affected \n\n after restart!";

        for(String line : currentDialogue.split("\n"))

        {

            g2.setFont(g2.getFont().deriveFont(40F));

            g2.drawString(line,textX,textY);

            textY+=40;

        }

        textY = frameY + gp.tileSize * 9 ;

        g2.setFont(g2.getFont().deriveFont(30F));

         g2.drawString("Back", textX, textY);

        if(commandNum==0)

        {

            g2.drawString(">", textX-25, textY);

            if(gp.keyH.enterPressed==true)

            {

                subState=0;

            }

        }

    }

    public void options_controls(int frameX,int frameY)

    {

        int textX;

        int textY;

        String text = "Controls";

        textX = getXforCenteredText(text);

        textY = frameY + gp.tileSize+20;

        g2.drawString(text,textX,textY);

         textX = frameX + gp.tileSize-20;

        textY += gp.tileSize;

        g2.setFont(g2.getFont().deriveFont(25F));

        g2.drawString("Movement", textX, textY);

        textY+=gp.tileSize;

        g2.drawString("Confirm/Attack", textX, textY);

        textY+=gp.tileSize;

        g2.drawString("Throw", textX, textY);

        textY+=gp.tileSize;

        g2.drawString("Character Screen", textX, textY);

        textY+=gp.tileSize;

        g2.drawString("Pause", textX, textY);

        textY+=gp.tileSize;

        g2.drawString("Options", textX, textY);

        textY+=gp.tileSize;

          textX = frameX + gp.tileSize*6;

          textY = frameY + (int)(gp.tileSize*2.5);

        g2.drawString("WASD", textX, textY);

        textY+=gp.tileSize;

        g2.drawString("ENTER", textX, textY);

        textY+=gp.tileSize;

        g2.drawString("CTRL", textX, textY);

        textY+=gp.tileSize;

        g2.drawString("C", textX, textY);

        textY+=gp.tileSize;

        g2.drawString("P", textX, textY);

        textY+=gp.tileSize;

        g2.drawString("ESC", textX, textY);

        textY+=gp.tileSize;

         textX = frameX + gp.tileSize;

        textY = frameY + gp.tileSize * 9 ;

        g2.setFont(g2.getFont().deriveFont(30F));

         g2.drawString("Back", textX, textY);

        if(commandNum==0)

        {

            g2.drawString(">", textX-25, textY);

            if(gp.keyH.enterPressed==true)

            {

                subState=0;

            }

        }

    }

    public void drawInventory(Entity entity , boolean cursor)

    {

         int frameX=0;

         int frameY=0;

         int frameWidth=0;

         int frameHeight=0;

         int slotCol=0;

         int slotRow=0;

        if(entity==gp.player)

        {

         frameX=gp.tileSize*12;

         frameY=gp.tileSize;

         frameWidth=gp.tileSize*6;

         frameHeight=gp.tileSize*5;

         slotCol=playerSlotCol;

         slotRow=playerSlotRow;

        }

        else

        {

         frameX=gp.tileSize*2;

         frameY=gp.tileSize;

         frameWidth=gp.tileSize*6;

         frameHeight=gp.tileSize*5;

         slotCol=npcSlotCol;

         slotRow=npcSlotRow;

        }

         drawSubWindow(frameX,frameY,frameWidth,frameHeight);

         final int slotXstart = frameX + 20;

         final int slotYstart = frameY + 20;

         int slotX = slotXstart;

         int slotY = slotYstart;

         int slotSize = gp.tileSize+3;

         for(int i = 0 ; i < entity.inventory.size(); i++)

         {

             if(entity.inventory.get(i)== entity.currentWeapon || entity.inventory.get(i)== entity.currentShield )

             {

                     g2.setColor(new Color(240,190,90));

                  g2.fillRoundRect(slotX,slotY,gp.tileSize,gp.tileSize,10,10);

             }

             g2.drawImage(entity.inventory.get(i).down1, slotX,slotY,null);

             if(entity == gp.player && entity.inventory.get(i).amount > 1)

             {

                  g2.setFont(g2.getFont().deriveFont(25F));

                  int amountX;

                  int amountY;

                  String s = " "+entity.inventory.get(i).amount;

                  amountX = getXforRightText(s,slotX + 44);

                  amountY = slotY + gp.tileSize;

                  g2.setColor(new Color(60,60,60));

                  g2.drawString(s,amountX,amountY);

                   g2.setColor(Color.white);

                  g2.drawString(s,amountX-3,amountY-3);

             }

             slotX+=slotSize;

             if(i == 4 || i==9 || i==14)

             {

                 slotX = slotXstart;

                 slotY += slotSize;

             }

         }

         if(cursor==true)

         {

         int cursorX = slotXstart + (slotSize * slotCol);

         int cursorY = slotYstart + (slotSize * slotRow);

         int cursorWidth = gp.tileSize;

         int cursorHeight = gp.tileSize;

         g2.setColor(Color.white);

         g2.setStroke(new BasicStroke(3));

         g2.drawRoundRect(cursorX,cursorY,cursorWidth,cursorHeight,10,10);

         int dFrameX=frameX;

         int dFrameY=frameY+frameHeight;

         int dFrameWidth=frameWidth;

         int dFrameHeight=gp.tileSize * 3;

         int textX = dFrameX + 20;

          int textY = dFrameY + gp.tileSize;

          g2.setFont(g2.getFont().deriveFont(25F));

          int itemIndex = getItemIndex(slotCol,slotRow);

          if(itemIndex < entity.inventory.size())

          {

               drawSubWindow(dFrameX,dFrameY,dFrameWidth,dFrameHeight);

              for(String line : entity.inventory.get(itemIndex).description.split("\n"))

              {

                  g2.drawString(line, textX,textY);

                  textY+=32;

              }

          }

         }

    }

    public int getItemIndex(int slotCol , int slotRow)

    {

        int itemIndex = slotCol + (slotRow*5);

        return itemIndex;

    }

    public void drawMessage()

    {

        int messageX = gp.tileSize;

        int messageY = gp.tileSize*4;

          g2.setFont(g2.getFont().deriveFont(Font.BOLD,35F));

        for(int i =0; i < message.size(); i++)

        {

            if(message.get(i)!=null)

            {

                g2.setColor(Color.black);

                g2.drawString(message.get(i), messageX+2, messageY+2);

                g2.setColor(Color.white);

                g2.drawString(message.get(i), messageX, messageY);

                int counter = messageCounter.get(i)+1;

                messageCounter.set(i,counter);

                messageY+=50;

                if(messageCounter.get(i)>180)

                {

                    message.remove(i);

                    messageCounter.remove(i);

                }

            }

        }

    }

    public void drawCharacterScreen()

    {

        final int frameX = gp.tileSize*2;

        final int frameY = gp.tileSize-10;

        final int frameWidth = gp.tileSize * 5;

        final int frameHeight = gp.tileSize * 11;

        drawSubWindow(frameX,frameY,frameWidth,frameHeight);

        g2.setColor(Color.white);

        g2.setFont(g2.getFont().deriveFont(23F));

        int textX = frameX +20;

        int textY = frameX -1;

        final int lineHeight = 28;

        g2.drawString("Semester", textX, textY);

        textY+=lineHeight;

         g2.drawString("Department", textX, textY);

        textY+=lineHeight;

         g2.drawString("Enroll", textX, textY);

        textY+=lineHeight;

         g2.drawString("Life", textX, textY);

        textY+=lineHeight;

         g2.drawString("Exp", textX, textY);

        textY+=lineHeight;

         g2.drawString("Money", textX, textY);

        textY+=lineHeight;

         g2.drawString("NextLevelExp", textX, textY);

        textY+=lineHeight;

         g2.drawString("Attack", textX, textY);

        textY+=lineHeight;

         g2.drawString("Defense", textX, textY);

        textY+=lineHeight;

        g2.drawString("Sarcasm", textX, textY);

        textY+=lineHeight;

        g2.drawString("Intelligence", textX, textY);

        textY+=lineHeight;

        g2.drawString("Communication", textX, textY);

        textY+=lineHeight;

        g2.drawString("Fights Taken", textX, textY);

        textY+=lineHeight;

        g2.drawString("Fights Resolved", textX, textY);

        textY+=lineHeight;

         g2.drawString("Weapon", textX, textY);

        textY+=lineHeight;

         g2.drawString("Shield", textX, textY);

        textY+=lineHeight;

        int tailX  = (frameX + frameWidth)- 30;

        textY = frameY + gp.tileSize+10;

        String value;

        value = String.valueOf(gp.player.semester);

        textX = getXforRightText(value,tailX);

        g2.drawString(value, textX, textY);

         textY+=lineHeight;

         value = String.valueOf(gp.player.department);

        textX = getXforRightText(value,tailX);

        g2.drawString(value, textX, textY);

         textY+=lineHeight;

         value = String.valueOf(gp.player.enrollment);

        textX = getXforRightText(value,tailX);

        g2.drawString(value, textX, textY);

         textY+=lineHeight;

         value = String.valueOf(gp.player.life+"/"+gp.player.maxLife);

        textX = getXforRightText(value,tailX);

        g2.drawString(value, textX, textY);

         textY+=lineHeight;

         value = String.valueOf(gp.player.exp);

        textX = getXforRightText(value,tailX);

        g2.drawString(value, textX, textY);

         textY+=lineHeight;

         value = String.valueOf(gp.player.coin);

        textX = getXforRightText(value,tailX);

        g2.drawString(value, textX, textY);

         textY+=lineHeight;

         value = String.valueOf(gp.player.nextLevelExp);

        textX = getXforRightText(value,tailX);

        g2.drawString(value, textX, textY);

         textY+=lineHeight;

         value = String.valueOf(gp.player.attack);

        textX = getXforRightText(value,tailX);

        g2.drawString(value, textX, textY);

         textY+=lineHeight;

         value = String.valueOf(gp.player.defense);

        textX = getXforRightText(value,tailX);

        g2.drawString(value, textX, textY);

         textY+=lineHeight;

          value = String.valueOf(gp.player.sarcasm);

        textX = getXforRightText(value,tailX);

        g2.drawString(value, textX, textY);

         textY+=lineHeight;

          value = String.valueOf(gp.player.intelligence);

        textX = getXforRightText(value,tailX);

        g2.drawString(value, textX, textY);

         textY+=lineHeight;

          value = String.valueOf(gp.player.communication);

        textX = getXforRightText(value,tailX);

        g2.drawString(value, textX, textY);

         textY+=lineHeight;

          value = String.valueOf(gp.player.f_taken);

        textX = getXforRightText(value,tailX);

        g2.drawString(value, textX, textY);

         textY+=lineHeight;

          value = String.valueOf(gp.player.f_resolved);

        textX = getXforRightText(value,tailX);

        g2.drawString(value, textX, textY);

         textY+=lineHeight;

         g2.drawImage(gp.player.currentWeapon.down1,tailX-gp.tileSize,textY-30,null);

         textY+=gp.tileSize;

         g2.drawImage(gp.player.currentShield.down1,tailX-gp.tileSize,textY-35,null);

         textY+=gp.tileSize;

    }

    public void drawPlayerLife()

    {

        int x = gp.tileSize/2;

        int y = gp.tileSize/2;

        int i = 0;

        while(i<gp.player.maxLife/2)

        {

            g2.drawImage(heart_blank,x,y,null);

            i++;

            x+= gp.tileSize;

        }

        x = gp.tileSize/2;

        y = gp.tileSize/2;

        i = 0;

         while(i<gp.player.life)

        {

            g2.drawImage(heart_half,x,y,null);

            i++;

             if(i<gp.player.life)

          {

            g2.drawImage(heart_full,x,y,null);

          }

             i++;

             x+= gp.tileSize;

        }

         x = (gp.tileSize/2)-5;

        y = (int)(gp.tileSize*1.5);

        i = 0;

        while(i<gp.player.maxMana)

        {

            g2.drawImage(ball_blank,x,y,null);

            i++;

            x+=35;

        }

          x = (gp.tileSize/2)-5;

        y = (int)(gp.tileSize*1.5);

        i = 0;

        while(i<gp.player.mana)

        {

         g2.drawImage(ball_full,x,y,null);

          i++;

            x+=35;

        }

    }

    public void drawTitleScreen()

    {

          try {

        // Load the animated GIF using ImageIcon

        ImageIcon gifIcon = new ImageIcon(getClass().getResource("/res/npc/bg1.gif"));

        Image gifImage = gifIcon.getImage();

        // Calculate the scale factor to fit the GIF on the screen

        double scaleX = (double) gp.screenWidth / gifImage.getWidth(null);

        double scaleY = (double) (gp.screenHeight - 100) / gifImage.getHeight(null);

        double scale = Math.min(scaleX, scaleY);

        // Calculate the new width and height

        int newWidth = (int) (gifImage.getWidth(null) * scale);

        int newHeight = (int) (gifImage.getHeight(null) * scale);

        // Calculate the position to center the GIF

        int xPos = (gp.screenWidth - newWidth) / 2;

        int yPos = (gp.screenHeight - 100 - newHeight) / 2;

        // Draw the scaled GIF

        g2.drawImage(gifImage, xPos - 100, yPos, newWidth + 400, newHeight + 100, null);

        // Load and draw the static background image

        BufferedImage backgroundImage1 = ImageIO.read(getClass().getResourceAsStream("/res/npc/bg2-.png"));

        double scaleX1 = (double) gp.screenWidth / backgroundImage1.getWidth();

        double scaleY1 = (double) (gp.screenHeight - 100) / backgroundImage1.getHeight();

        double scale1 = Math.min(scaleX1, scaleY1);

        // Calculate the new width and height

        int newWidth1 = (int) (backgroundImage1.getWidth() * scale1);

        int newHeight1 = (int) (backgroundImage1.getHeight() * scale1);

        // Calculate the position to center the image

        int xPos1 = (gp.screenWidth - newWidth1) / 2;

        int yPos1 = (gp.screenHeight - 100 - newHeight1) / 2;

        // Draw the static background image

        g2.drawImage(backgroundImage1, xPos1, yPos1, newWidth1, newHeight1, null);

    } catch (IOException e) {

        e.printStackTrace();

    }

    g2.setFont(g2.getFont().deriveFont(Font.BOLD, 48F));

    int x = getXforCenteredText("");

    int y = gp.tileSize * 3;

    // Draw "NEW GAME" option

    String text = "NEW GAME";

    x = getXforCenteredText(text);

    y += gp.tileSize * 6;

    // Check if "NEW GAME" is the active option

    if (commandNum == 0) {

        // Text Animation (Pulsating and color change)

        float alpha = Math.abs((float) Math.sin(System.currentTimeMillis() * 0.005));

        g2.setColor(new Color(255, 255, 102, (int) (alpha * 255))); // Green pulse

        g2.drawString(text, x, y);

        // Draw ">" for the active option with shadow

        g2.setColor(new Color(0, 0, 0, 150)); // Shadow color

        g2.drawString(">", x - gp.tileSize + 2, y - 10 + 2); // Shadow position

        g2.setColor(new Color(255, 255, 102, (int) (alpha * 255))); // Green pulse

        g2.drawString(">", x - gp.tileSize, y - 10); // Main position

    } else {

        // Draw steady text for inactive options

        g2.setColor(Color.WHITE);

        g2.drawString(text, x, y);

    }

    // Draw "LOAD GAME" option

    text = "LOAD GAME";

    x = getXforCenteredText(text);

    y += gp.tileSize;

    // Check if "LOAD GAME" is the active option

    if (commandNum == 1) {

        // Text Animation (Pulsating and color change)

        float alpha = Math.abs((float) Math.sin(System.currentTimeMillis() * 0.005));

        g2.setColor(new Color(255, 255, 102, (int) (alpha * 255))); // Green pulse

        g2.drawString(text, x, y);

        // Draw ">" for the active option with shadow

        g2.setColor(new Color(0, 0, 0, 150)); // Shadow color

        g2.drawString(">", x - gp.tileSize + 2, y - 10 + 2); // Shadow position

        g2.setColor(new Color(255, 255, 102, (int) (alpha * 255))); // Green pulse

        g2.drawString(">", x - gp.tileSize, y - 10); // Main position

    } else {

        // Draw steady text for inactive options

        g2.setColor(Color.WHITE);

        g2.drawString(text, x, y);

    }

    // Draw "EXIT GAME" option

    text = "EXIT GAME";

    x = getXforCenteredText(text);

    y += gp.tileSize;

    // Check if "EXIT GAME" is the active option

    if (commandNum == 2) {

        // Text Animation (Pulsating and color change)

        float alpha = Math.abs((float) Math.sin(System.currentTimeMillis() * 0.005));

        g2.setColor(new Color(255, 255, 102, (int) (alpha * 255))); // Green pulse

        g2.drawString(text, x, y);

        // Draw ">" for the active option with shadow

        g2.setColor(new Color(0, 0, 0, 150)); // Shadow color

        g2.drawString(">", x - gp.tileSize + 2, y - 10 + 2); // Shadow position

        g2.setColor(new Color(255, 255, 102, (int) (alpha * 255))); // Green pulse

        g2.drawString(">", x - gp.tileSize, y - 10); // Main position

    } else {

        // Draw steady text for inactive options

        g2.setColor(Color.WHITE);

        g2.drawString(text, x, y);

    }

    }

   public void drawDialogueScreen() {

    int x = gp.tileSize * 3;

    int y = gp.tileSize / 2;

    int width = gp.screenWidth - (gp.tileSize * 6);

    int height = gp.tileSize * 4;

    // Draw the sub window for dialogue

    drawSubWindow(x, y, width, height);

    // Set font for dialogue text

    g2.setFont(g2.getFont().deriveFont(Font.PLAIN, 25F));

    // Draw dialogue text

    int textX = x + gp.tileSize;

    int textY = y + gp.tileSize;

    for (String line : currentDialogue.split("\n")) {

        g2.drawString(line, textX, textY);

        textY += 40;

    }

//    // Draw NPC's name outside the sub window

//    g2.setFont(g2.getFont().deriveFont(Font.BOLD, 28F)); // Increase font size

//    int nameY = y + height + 30; // Adjust y position to be outside the sub window

//

//    if (currentNPCName != null) {

//        // Draw shadow

//        g2.setColor(Color.BLACK);

//        g2.drawString(currentNPCName, x + gp.tileSize + 2, nameY + 2);

//

//        // Draw main text

//        g2.setColor(Color.WHITE); // Change color for the NPC's name to white for visibility

//        g2.drawString(currentNPCName, x + gp.tileSize, nameY);

//    } else {

//        g2.drawString("", x + gp.tileSize, nameY);

//    }

}

public void drawSubWindow(int x, int y, int width, int height) {

    Color c = new Color(0, 0, 0, 210);

    g2.setColor(c);

    g2.fillRoundRect(x, y, width, height, 35, 35);

    c = new Color(255, 255, 255);

    g2.setColor(c);

    g2.setStroke(new BasicStroke(5));

    g2.drawRoundRect(x + 5, y + 5, width - 10, height - 10, 25, 25);

}

    public void drawPauseScreen()

    {

        g2.setFont(g2.getFont().deriveFont(Font.PLAIN,80F));

        String text = "PAUSED";

        int x = getXforCenteredText(text);

        int y = gp.screenHeight/2;

        g2.drawString(text,x,y);

    }

    public int getXforCenteredText(String text)

    {

        int length = (int)g2.getFontMetrics().getStringBounds(text,g2).getWidth();

        int x = gp.screenWidth/2 - length/2;

        return x;

    }

    public int getXforRightText(String text, int tailX)

    {

        int length = (int)g2.getFontMetrics().getStringBounds(text,g2).getWidth();

        int x = tailX - length;

        return x;

    }

}

AssetSetter.java:

CollisionChecker.java:

CutsceneManager.java:

EventRect.java:

EventHandler.java:

UtilityTool.java:

Sound.java:

Classes in entity Package:

Entity.java
NPC_Aimen.java
NPC_Aqib.java
NPC_Ayesha.java
NPC_Canteen_Orange.java
NPC_Fahad.java
NPC_Hamza.java
NPC_Hoor_ul_Ain.java
NPC_Jawad.java
NPC_M_Urooj.java
NPC_Malik.java
NPC_Mint_Store.java
NPC_Orange_Cat.java
NPC_Raheel.java
NPC_Salman.java
NPC_Sufiyan.java
NPC_TuckShop.java
NPC_Urooj.java
NPC_White_Cat.java
NPC_Zain.java
Player_Dummy.java
NPC_Aimen.java
NPC_Aqsa.java
NPC_Bahria.java
NPC_Canteen_Purple.java
NPC_Fatima.java
NPC_Haseeb.java
NPC_Ibrahim.java
NPC_Keyan.java
NPC_Maaz.java
NPC_Maria.java
NPC_Mustafa.java
NPC_Qudama.java
NPC_Rizwan.java
NPC_Shahsawar.java
NPC_Suleman.java
NPC_UmerH.java
NPC_Usman.java
NPC_WowFries_Black.java
NPC_Zohaib.java
Projectile.java
NPC_Anisha.java
NPC_Awais.java

NPC_Canteen_Cyan.java
NPC_Canteen_Yellow.java
NPC_Hadi.java
NPC_Hassan.java
NPC_Javeria.java
NPC_M_Umer.java
NPC_Mahad.java
NPC_Mehwish.java
NPC_Omer.java
NPC_Rabeen.java
NPC_Sadaf.java
NPC_Stationary.java
NPC_Taha.java
NPC_UmerQ.java
NPC_Wahaj.java
NPC_WowFries_Blue.java
Player.java
Quest.java

Classes in objects Package:

OBJ_Axe.java
OBJ_BlueHeart.java
OBJ_Boots.java
OBJ_Biryani.java
OBJ_Cash_50.java
OBJ_Cash_100.java
OBJ_Chest.java
OBJ_Door.java
OBJ_Dynamite.java
OBJ_Glasses.java
OBJ_Green_Potion.java
OBJ_IronDoor.java
OBJ_Key.java
OBJ_ManaBall.java
OBJ_Mint.java
OBJ_Paint_Red.java
OBJ_Paint_Yellow.java
OBJ_PaperBall.java
OBJ_Red_Potion.java
OBJ_Shield_Blue.java
OBJ_Shield_Wood.java
OBJ_Sword_Normal.java
OBJ_Sword_Rizwan.java
OBJ_Token.java
OBJ_Water.java

Classes in monster Package:

MON_Green_Snake.java
MON_Red_Snake.java
MON_The_Finals.java

Classes in environment Package:

EnvironmentManager.java
Ligthing.java

Classes in ai Package:

PathFinder.java
Node.java

Classes in tile Package:

TileManager.java
Tile.java

INTERFACES

CONCLUSION

Our 2D RPG game is not just an immersive experience set in Bahria

University but also a comprehensive demonstration of advanced OOP

principles.

With a compelling narrative, intricate quest system, and a rich array

of characters, it provides a thorough understanding of inheritance,

polymorphism, abstraction, aggregation, and more.

 The game effectively combines education and entertainment,

showcasing the practical application of software engineering concepts

in a dynamic and interactive environment.

This project stands as a tribute to the creativity and technical skills

of BSE-2A, making it a remarkable achievement in the realm of

educational gaming.

Dedicated to the power-ups collected, dungeons cleared,

and final bosses defeated by BSE-2A,

united as one.

